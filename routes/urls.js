const express=require('express');
const router=express.Router();
const {handleGenerateShortUrl}=require('../controllers/urls');
router.post('/',handleGenerateShortUrl);
module.exports=router;