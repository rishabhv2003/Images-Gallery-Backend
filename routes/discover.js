const express = require('express');
const category = require('../../cgip-micro-1-main/models/category');
const router = express.Router();
const imgGallery = require("../models/imgGallery");

let skip = 0;
router.get("/get-images/:category/:shuffle", async (req, res, next) => {
	/* route to get 4 categories of images */
	const reqCategory = req.params.category;
	const shuffle = req.params.shuffle;

	
	skip = (skip + parseInt(shuffle)); // it will give new images everytime we click shuffle.

	const getImages = await imgGallery.find({ category: { $in: [reqCategory] } }).select({ name: 1, _id: 0 }).sort({ createdAt: 1 }).skip(skip).limit(2);
	if(getImages.length===0){
		skip = 0;
	}
	res.json(getImages);
	/* sending json file of the requested categories */
});

router.get("/get-images", async (req, res, next) => {
	/* getting images based on filter */
	const imgFilter = req.query.filter;
	const getImages = await imgGallery.find({ $or: [{ name: { $in: imgFilter } }, { category: { $in: imgFilter } }] });
	res.json(getImages);
	/* sending json file of the requested category */
});

module.exports = router;