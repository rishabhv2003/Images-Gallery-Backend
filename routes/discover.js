const express = require('express');
const router = express.Router();
const imgGallery = require("../models/imgGallery");

let skip = 0;
router.get("/get-images/:category/:shuffle", async (req, res, next) => {
	/* route to get 4 categories of images */
	try {
		const reqCategory = req.params.category;
		const shuffle = req.params.shuffle;
		var data = imgGallery.find();
		data.count((err, count) => {
			skip = (skip + parseInt(shuffle)) % count;
		})

		var getImages = await imgGallery.find({ category: { $in: [reqCategory] } }).select({ name: 1, _id: 0 }).sort({ createdAt: 1 }).skip(skip).limit(4);
		if (getImages.length === 0) {
			skip = 0;
			getImages = await imgGallery.find({ category: { $in: [reqCategory] } }).select({ name: 1, _id: 0 }).sort({ createdAt: 1 }).limit(4);
		}
		res.json(getImages);
	} catch (error) {
		console.log(error);
		next(error);
	}
	/* sending json file of the requested categories */
});

router.get("/get-images/", async (req, res, next) => {
	/* getting images based on filter */
	try {
		const imgFilter = req.query.filter;
		const getImages = await imgGallery.find({ $or: [{ name: { $in: imgFilter } }, { category: { $in: imgFilter } }] });
		res.json(getImages);
	} catch (error) {
		console.log(error);
		next(error);
	}
	/* sending json file of the requested category */
});

router.get("/likes/:imageId", async (req, res, next) => {
	try {
		const imageId = req.params.imageId;
		if (!imageId) {
			res.status(400).send("Bad Request");
		}
		let likeValue;
		const imageDetails = await imgGallery.findOne({ _id: imageId });
		if (imageDetails) {
			if (imageDetails.likes) {
				likeValue = 0;
			} else {
				likeValue = 1;
			}
		}
		await imgGallery.updateOne({ _id: imageId }, { $set: { likes: likeValue } });
		res.send("Favorite updated");
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;