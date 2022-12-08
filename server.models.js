const mongoose = require('mongoose');
const bcrypt =require('bcrypt')
 const validator=require('validator')
const ServerSchema = mongoose.Schema({

	time: {
		type: String,
		require: true
	},
	date: {
		type: String,
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	name: {
		type: String,

	},
	sendmessage: {
		type: String
	},
	subject: {
		type: String
	},
	gender: {
		type: String
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}


});
ServerSchema.statics.signup = async function(email,password){
	// console.log(this);
	//validation
	console.log(email,password);
	if (!email || !password) {
	  throw Error('All fields must be filled  ')
	}
	
	if (!validator.isEmail(email )) {
	  throw Error('Email is not valid')
	}
	if (!validator.isStrongPassword(password)) {
	  throw Error('password is not strong enough')  
	}
  
  
	const exists = await  this.findOne({email})
  
	if (exists) {
	  throw Error("email already in use")  
	}
	// mypassword
	// const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, 10)
	const user = await this.create({email,password:hash})
	console.log(user, 'it works till here');
	return user;
  }
  
  // return user
  //static login method
  ServerSchema.statics.login = async function (email, password ) {
	// console.log(this);
	if (!email || !password) {
	  throw Error('All fields must be filled  ')
	}    
	const user = await  this.findOne({email})
  
	if (!user) {
	  throw Error("incorrect email")  
	}
	const match = await bcrypt.compare(email, password)
  
	if (!match) {
	  throw Error('Incorrect password')
	}
  
	return user
  
  }
  
  

const ServerModel = mongoose.model('server', ServerSchema);

module.exports = { Server: ServerModel };
