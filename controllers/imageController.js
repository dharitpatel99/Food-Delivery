const Image = require("../models/image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { log } = require("console");

const uploadImageController = async (req, res) => {
  try {
    //check if file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }

    //upload to cloudinary
    
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    

    //store the image url and public id along with the uploaded user id in database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    //delete the file from local stroage
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Imaged uploaded successfully",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

const fetchImagesController = async (req, res) => {

  try{
    const images = await Image.find({});
    if(!images){
      return res.status(404).json({
        success:false,
        message:"image not found"
      })
    }
    return res.status(200).json({
      success:false,
      message:"image fetched successfully",
      data:images
    })
    

  }catch(e){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }

};

const deleteImageController = async (req, res) => {

  try{
    const imageId = req.params.id;
    const userId = req.userInfo.userId;
  const image = await Image.findById(imageId);


  if(!image){
    return res.status(404).json({
      success:false,
      message:"Image not found"
    })
  }

  if(image.uploadedBy.toString() !== userId){
    return res.status(403).json({
      success:false,
      message:"You are not authorized to delete the image"
    })
  }

  await cloudinary.uploader.destroy(image.publicId)

  await Image.findByIdAndDelete(imageId);

  return res.status(200).json({
    success:true,
    message:"image deleted successfully"
  })


  }catch(e){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }


};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageController,
};