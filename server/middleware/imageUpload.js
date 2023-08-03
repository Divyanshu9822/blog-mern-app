// imageUpload.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with your account details
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Define the storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images", // The folder in which the images will be stored on Cloudinary
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
