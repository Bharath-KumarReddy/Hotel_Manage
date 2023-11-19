const mongoose = require("mongoose");

// const mongoDBURL = 'mongodb://127.0.0.1:27017/ProjectK';
const mongoDBURL = 'mongodb+srv://BharathKH:BharathKH@cluster0.pppfncw.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})


dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose
