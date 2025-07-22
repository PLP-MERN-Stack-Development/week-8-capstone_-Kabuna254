const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB',error);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error(`Unhandled Rejection: ${error.message}`);
  mongoose.connection.close(() => {
    process.exit(1);
  });
});

module.exports = connectDB;
