const Restaurant = require("../models/restaurant");

const getAllRestaurant = async (req, res) => {
  try {
    const allRestaurant = await Restaurant.find({});

    if (allRestaurant?.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All restaurant fetched succesfully",
        data: allRestaurant,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const getRestaurantById = await Restaurant.findById(req.params.id);

    if (getRestaurantById) {
      return res.status(200).json({
        success: true,
        message: `Restaurant with ID ${req.param.id} found successfully`,
        data: getRestaurantById,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.param.id} not found `,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const addRestaurant = async (req, res) => {
  try {
    const resFormData = req.body;
    const restaurant = await Restaurant.create(resFormData);
    /* in case of modification
    const newRes = new Restaurant({
    resName,newCuisene,rating
    });
    await newRes.save()
    */

    if (resFormData) {
      return res.status(201).json({
        success: true,
        message: "New Restaurant added",
        data: restaurant,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid data. Restaurant could not be added.",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const resFormData = req.body;
    const updatedRest = await Restaurant.findByIdAndUpdate(
      req.params.id,
      resFormData,
      { new: true }
    );
    if (resFormData) {
      return res.status(200).json({
        success: true,
        message: `Restaurant with ID ${req.params.id} updated`,
        data: updatedRest,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const deleteRestaurantById = await Restaurant.findByIdAndDelete(
      req.params.id
    );
    if (deleteRestaurantById) {
      return res.status(200).json({
        success: true,
        message: `Restaurant with ID ${req.param.id} deleted successfully`,
        data: deleteRestaurantById,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Restaurant with ID ${req.param.id} not found `,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getAllRestaurant,
  getRestaurantById,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
