const short = require('shortid'); 
const Url=require('../models/urls');
async function handleGenerateShortUrl(req,res){
	const body=req.body;
	if(!body.url) return res.status(400).json({msg:'url is required'});
	console.log(body);
	const shorId=short();
	await Url.create({
		shortId:shorId,
		redirectURL:body.url,
		visitHistory:[]
	});
	return res.status(200).json({shortId:shorId});


}

module.exports={
	handleGenerateShortUrl
};