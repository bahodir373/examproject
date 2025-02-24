const mongoose = require('mongoose')
const Term = require('../models/Term')


const connectDB = async () => {
	try{
		await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(async () => {
		console.log('> Connected to MongoDB')
		})
	} catch(error){
		console.log(error.message)
	}
} 

module.exports = connectDB