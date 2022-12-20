const mongoose = require("mongoose");

/* model for image gallery */
var imagesGallery = new Schema({
    name: String,
    category: Array,
    likes: Number,
    imageLink: String,
    createdAt: Number,
    updatedAt: Number,
})
var ImagesGallery = mongoose.model('imagesGallery', imagesGallery);

module.exports = ImagesGallery;