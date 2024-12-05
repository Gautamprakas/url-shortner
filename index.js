const express=require('express');
const app=express();
const urlRouter=require('./routes/urls');
const Url=require('./models/urls');
const {connectMongoDB}=require('./connection');
const PORT =8001;
connectMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log('Mongo DB connected')
	).catch((err)=>console.log('MongoDB error',err));
app.use(express.json());
app.use('/url',urlRouter);
app.get('/url/:shortId',async (req,res)=>{
	const shortId=req.params.shortId;
	console.log(shortId);
	const entry=await Url.findOneAndUpdate({shortId},{
		$push:{
			visitHistory:{
				timestamps:Date.now()
			}
		}
	});
	console.log(entry);
	res.redirect(entry.redirectURL);
});

app.listen(PORT,()=>console.log(`server started at PORT ${PORT}`));