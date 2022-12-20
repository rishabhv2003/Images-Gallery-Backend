const express = require('express');
const router = express.Router();

router.get("/:category",(req,res)=>{
	res.send(req.params.category);
})

module.exports = router;