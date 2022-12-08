const dotenv = require('dotenv')
dotenv.config({ path: './Controllers/.env'});

const express=require('express')
const PORT=4000;
const  nodemailer=require('nodemailer')
const app= express('');
const cors= require('cors')
const Userroutes = require('./Routes/User')
const {  Server } = require('./server.models');
const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/DG';
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//routes
app.use("/server/server",Userroutes)




app.get('/get-user', async (req, res) => {
	const allServer = await Server.find();
	console.log('THis is get-servser')
	return res.json(allServer);
});



app.get('/get-server', async (req, res) => {
	const allServer = await Server.find();
	console.log('THis is get-servser')
	return res.json(allServer);
});

app.post('/add-server', async (req, res,) => {
	const { name,email,sendmessage,subject,date,time,age,gender } = req.body;
	console.log(req.body)
	console.log('This is add-server');

	async function main() {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let testAccount = await nodemailer.createTestAccount();
	  
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		  host: "smtp.ethereal.email",
		  port: 587,
		  secure: false, // true for 465, false for other ports
		  auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		  },
		});
	  
		// send mail with defined transport object
		let info = await transporter.sendMail({
		  from: '" 👻" <>', // sender address
		  to: "hyzeala28@gmail.com", // list of receivers
		  subject: "✔", // Subject line
		  text: "Hello world?", // plain text body
		  html: "<b>Hello world?</b>", // html body
		});
	  
		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	  
		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	  }
	  
	  main().catch(console.error); 
	
	
	const server = await Server.create({ name,email,subject,sendmessage,date,time,age,gender});
	
	res.status(200).json({server})
});


app.get('/getserver/:id', async (req, res) => {
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
