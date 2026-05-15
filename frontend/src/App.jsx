import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBook,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

import "./App.css";

function App() {

  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  const [search, setSearch] = useState("");

  // Fetch Books
  const fetchBooks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/books"
      );

      setBooks(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add Book
  const addBook = async () => {

    if (
      title === "" ||
      author === "" ||
      department === "" ||
      semester === "" ||
      price === "" ||
      contact === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/books",
        {
          title,
          author,
          department,
          semester,
          price,
          contact,
        }
      );

      setTitle("");
      setAuthor("");
      setDepartment("");
      setSemester("");
      setPrice("");
      setContact("");

      fetchBooks();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete Book
  const deleteBook = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/books/${id}`
      );

      fetchBooks();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="container">

      {/* Hero Section */}
      <div className="hero">

        <h1>
          Online Book Exchange Portal
        </h1>

        <p>
          Exchange academic books with students
        </p>

      </div>

      {/* Form */}
      <div className="form-box">

        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) =>
            setAuthor(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) =>
            setSemester(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) =>
            setContact(e.target.value)
          }
        />

        <button onClick={addBook}>
          Add Book
        </button>

      </div>

      {/* Search */}
      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Books"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* Book Cards */}
      <div className="book-grid">

        {books
          .filter((item) =>
            item.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((item) => (

            <div
              className="book-card"
              key={item._id}
            >

              <FaBook className="book-icon" />

              <h2>{item.title}</h2>

              <p>
                <strong>Author:</strong>{" "}
                {item.author}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {item.department}
              </p>

              <p>
                <strong>Semester:</strong>{" "}
                {item.semester}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {item.price}
              </p>

              <p>
                <strong>Contact:</strong>{" "}
                {item.contact}
              </p>

              <button
                onClick={() =>
                  deleteBook(item._id)
                }
              >
                <FaTrash /> Delete
              </button>

            </div>

          ))}

      </div>

    </div>
  );
}

export default App;