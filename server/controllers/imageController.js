const upload = require('../middleware/imageUpload');

const handleImageUpload = (req, res) => {
  // 'image' is the name of the field in the FormData that contains the image file
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image not provided' });
    }

    const imageUrl = req.file.path; // The Cloudinary URL of the uploaded image
    res.json({ imageUrl: imageUrl });
  });
};

module.exports = {
  handleImageUpload,
};
