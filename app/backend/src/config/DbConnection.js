const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://G21:2iyH5zsC8Nt$3UQ@cluster0.ybfv1xy.mongodb.net/NewsAggregator', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error);
  }
};

const disconnectDb = async () => {
  await mongoose.disconnect();
};



// Exporting the connection functions in case they are needed elsewhere
module.exports = { connectDb, disconnectDb };
