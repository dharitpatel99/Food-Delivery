const express =require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const authAdminMiddleware = require('../middlewares/adminAuthMiddleware')
const {uploadImageController,fetchImagesController,deleteImageController} = require('../controllers/imageController')
const uploadMiddleware = require('../middlewares/uploadMiddleware')


const router = express.Router();

router.post('/upload',authMiddleware, authAdminMiddleware,uploadMiddleware.single("image"),uploadImageController)
router.get('/get',authMiddleware,fetchImagesController)
router.delete('/delete/:id',authMiddleware, authAdminMiddleware,deleteImageController)
module.exports = router;