const Restaurant = require("../models/restuarantsModel");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerRestaurant = asyncHandler(async (req, res) => {
    const { name, phoneNo, description, openingTime, closingTime, admin } = req.body;
    const adminExists = await Restaurant.findOne({ admin: admin });
    if (adminExists) {
        res.status(400).json({ message:"Admin already has a Restaurant"})
    }
    else {
        if (req.file && !adminExists) {
            let uploadedFile;
            try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "DineWise",
                resource_type: "image",
            });
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error.message);
                res.status(500).json({ message: "Image could not be uploaded" });
            }
            const restaurant = await Restaurant.create({
                name,
                phoneNo,
                description,
                logo:uploadedFile.secure_url,
                openingTime,
                closingTime,
                admin
            })
            if (restaurant) {
                res.status(201).json({
                    message: "Restaurant added successfully "
                })
            }
        }
        else {
            res.status(400).json({message: "Error while adding a new Restaurant"})
        }
    }
})
module.exports={
    registerRestaurant
}