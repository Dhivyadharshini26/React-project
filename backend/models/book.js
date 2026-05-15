const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  department: String,
  semester: String,
  price: String,
  contact: String,
});

module.exports = mongoose.model(
  "Book",
  BookSchema
);