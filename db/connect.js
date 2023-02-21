const mongoose = require("mongoose");

const connectDB = (url) => {
  // returning a PROMISE
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};


module.exports = connectDB;