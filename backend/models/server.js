const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/bookexchange"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

// GET BOOKS
app.get("/books", async (req, res) => {

  const books = await Book.find();

  res.json(books);
});

// ADD BOOK
app.post("/books", async (req, res) => {

  const newBook = new Book(req.body);

  await newBook.save();

  res.json(newBook);
});

// DELETE BOOK
app.delete("/books/:id", async (req, res) => {

  await Book.findByIdAndDelete(req.params.id);

  res.json({ message: "Book Deleted" });
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});