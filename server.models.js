const mongoose = require('mongoose');
const ServerSchema = mongoose.Schema({
	time: String,
	date: Date,
	name: String,
	email: String,
	sendmessage: String,
	subject: String,
	age: Number,
	gender: String,
	user: { ref: '' }
});

const ServerModel = mongoose.model('server', ServerSchema);

module.exports = { Server: ServerModel };
