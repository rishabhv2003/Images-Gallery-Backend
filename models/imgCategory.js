const mongoose = require("mongoose");

/* model for image category */
var imagesCategory = new Schema({
    name: String,
    createdAt: Number,
    updatedAt: Number
});
var ImagesCategory = mongoose.model('imagesCategory', imagesCategory);

module.exports = ImagesCategory;