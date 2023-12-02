const mongoose = require('mongoose');


const connectDb = mongoose.connect('mongodb+srv://G21:2iyH5zsC8Nt$3UQ@cluster0.ybfv1xy.mongodb.net/NewsAggregator')
.then(()=>console.log("Database connected")) // if your database has auth 
.catch((err)=>console.log(err));


module.exports = connectDb;