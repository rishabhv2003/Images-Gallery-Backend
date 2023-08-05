const mongoose = require("mongoose");
var Schema = mongoose.Schema;
/* Schema for image category */
var imagesCategory = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);
/* Model for Images category */
var ImagesCategory = mongoose.model('imagesCategory', imagesCategory);

module.exports = ImagesCategory;