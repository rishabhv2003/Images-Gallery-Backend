const express = require('express');
const router = express.Router();
const imgGallery = require("../models/imgGallery");


router.get("/get-images/:category", async (req, res, next) => {
	/* route to get 4 images of requested category */
	const reqCategory = req.params.category;
	const getImages = await imgGallery.find({
		category: { $in : [reqCategory]}
	}).limit(4);
	// console.log(getImages);
	res.json(getImages);
	/* sending json file of the requested category */


});


module.exports = router;