const mongoose = require("mongoose");
var Schema = mongoose.Schema;

/* Schema for image gallery */
var imagesGallery = new Schema(
    {
        name: { type: String },
        category: { type: Array },
        likes: { type: Number },
        imageLink: { type: String },
    },
    {
        timestamps: true
    }
);

/* Model for ImagesGallery */
var ImagesGallery = mongoose.model('imagesGallery', imagesGallery);

module.exports = ImagesGallery;