const mongoose = require("mongoose");
var Schema = mongoose.Schema;
/* model for image category */
var imagesCategory = new Schema({
    name: { type: String, required: true },
    timestamps: { type: Date, required: true }
});
var ImagesCategory = mongoose.model('imagesCategory', imagesCategory);

module.exports = ImagesCategory;