const express=require('express')
const PORT=4000;
const app= express('');
const cors= require('cors')
const {  Server } = require('./server.models');
const mongoose=require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/DG';
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.get('/get-server', async (req, res) => {
	const allServer = await Server.find();
	return res.json(allServer);
});

app.post('/add-server', async (req, res,) => {
	const { name,email,sendmessage,subject,date,time,age,gender } = req.body;
	console.log(req.body)
	// const isDateAndTime=await Server.findOne({date,time})
	// if(isDateAndTime){
	// 	const  error=new Error("please the date and te time already exist ,please choice another one ")
	// 	error.status=500
	// 	return next(error)
	// }
	const server = await Server.create({ name,email,subject,sendmessage,date,time,age,gender});
	if(!server){
		return next("fail to save server ")
	}
	console.log(server)
	res.status(200).json({server})
});


app.get('/get-final/:id', async (req, res) => {
	const id = req.params.id;
	const server = await Server.findById(id);
	return res.json(server);
});


app.delete('/deleteserver/:id', async (req, res) => {
	const id = req.params.id;
	await Server.findByIdAndDelete(id);
	return res.send('server deleted');
});


app.put('/update-server/:id', async (req, res) => {
	const id = req.params.id;
	const { name,email,subject,sendmessage,date,time,age,gender} = req.body;
	console.log(req.body)
	const updateServer = await Server.findByIdAndUpdate(id, { name,email,  subject,sendmessage,date,time,age,gender }, { new: true });
	return res.json(updateServer);
});

app.use((error,req,res,next)=>{
	console.log(error)
	res.status(error.status).json({error:"please send another date"})
})

const start = () => {
	mongoose.connect(MONGO_URI, (errr) => {
		if (errr) {
			return console.log('Failed to connect to mongoDB');
		}
		console.log('Connected to DB');
	});
 app.listen(PORT,()=>console.log(`server is runing on ${PORT}`))
}
 start()
