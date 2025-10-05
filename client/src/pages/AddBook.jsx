import React, { useState } from "react";
import BookService from "../services/book.services.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishYear: "",
    isbn: "",
    publisher: "",
    edition: "",
    pageCount: "",
    language: "",
    genre: "",
    description: "",
    coverImage: "",
    location: "A1-B2-C3",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setBook({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      isbn: "",
      publisher: "",
      edition: "",
      pageCount: "",
      language: "",
      genre: "",
      description: "",
      coverImage: "",
      location: "A1-B2-C3",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบ field required
    if (!book.title || !book.author || !book.category) {
      Swal.fire({
        title: "Validation error",
        text: "Title, Author, and Category are required",
        icon: "error",
        background: "#f3f4f6",
        color: "#111827",
      });
      return;
    }

    // ✅ แปลง number fields
    const payload = {
      ...book,
      publishYear: book.publishYear ? Number(book.publishYear) : undefined,
      pageCount: book.pageCount ? Number(book.pageCount) : undefined,
    };

    try {
      console.log("Payload to send:", payload);

      const newBook = await BookService.createBook(payload);

      if (newBook.status === 201 || newBook.status === 200) {
        await Swal.fire({
          title: "Add new book",
          text: "Add new book successfully!",
          icon: "success",
          background: "#f3f4f6",
          color: "#111827",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      const backendData = error.response?.data;
      const errorText = backendData?.errors
        ? backendData.errors.map((e) => `${e.field}: ${e.message}`).join("\n")
        : backendData?.message || error.message || "Request failed";

      console.error("Create book error:", backendData || error);

      Swal.fire({
        title: "Add new book",
        text: errorText,
        icon: "error",
        background: "#f3f4f6",
        color: "#111827",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-10">
      <div className="w-full max-w-2xl p-6 bg-gray-50 rounded-2xl shadow-lg ring-1 ring-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
          {[
            { label: "Title", name: "title", type: "text", required: true },
            { label: "Author", name: "author", type: "text", required: true },
            { label: "Category", name: "category", type: "text", required: true },
            { label: "Publish Year", name: "publishYear", type: "number" },
            { label: "ISBN", name: "isbn", type: "text" },
            { label: "Publisher", name: "publisher", type: "text" },
            { label: "Edition", name: "edition", type: "text" },
            { label: "Page Count", name: "pageCount", type: "number" },
            { label: "Language", name: "language", type: "text" },
            { label: "Genre", name: "genre", type: "text" },
            { label: "Description", name: "description", type: "text" },
            
          ].map(({ label, name, type, required }) => (
            <div key={name}>
              <label className="block mb-1 text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={book[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                required={required || false}
                min={type === "number" ? "0" : undefined}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          ))}

          {/* Cover Image */}
          <div>
            <label className="block mb-1 text-gray-700">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={book.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {book.coverImage && (
              <div className="mt-3">
                <img
                  src={book.coverImage}
                  alt="cover preview"
                  className="h-32 rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition"
            >
              Add
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 rounded-lg transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
