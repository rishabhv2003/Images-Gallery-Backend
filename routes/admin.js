const express = require('express');
const router = express.Router();
const imgCategory = require("../models/imgCategory");
const imgGallery = require("../models/imgGallery");
router.get("/add-category/:categoryName", (req, res, next) => {
	try {
		var categoryName = req.params.categoryName;
		if (!categoryName) {
			res.send("Please enter valid category.");
		}
		/* checking if the cateogry already exist or not. */
		if (imgCategory.countDocuments({ name: categoryName }, function (err, count) {
			if (count > 0) {
				res.send("Category already exists.");
			}
			else {
				const addCatogory = { name: categoryName };
				imgCategory.create(addCatogory);
				res.send("Successfully added new category.");
			}
		}));
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post("/add-image",(req,res,next)=>{
	try {
		const imgName = req.body.name;
		const imgCategory = req.body.category;
		const imageUrl = req.body.imageLink;

		if (!imgName || !imgCategory.length || !imageUrl) {
            res.status(400).send("Bad Request");
        }
		
		const addImgToGallery = {
			name: imgName,
			category: imgCategory,
			imageLink: imageUrl
		}

		imgGallery.create(addImgToGallery);
		res.send("Image added!!!");

	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;