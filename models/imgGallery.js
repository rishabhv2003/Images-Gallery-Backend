const mongoose = require("mongoose");
var Schema = mongoose.Schema;
/* model for image gallery */
var imagesGallery = new Schema(
    {
        name: String,
        category: Array,
        likes: Number,
        imageLink: String
    },
    {
        timestamps: true
    }
);
var ImagesGallery = mongoose.model('imagesGallery', imagesGallery);

module.exports = ImagesGallery;