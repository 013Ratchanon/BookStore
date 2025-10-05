import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookService from "../services/book.services.js";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
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
    location: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const resp = await BookService.getBookById(id);
        if (resp.status === 200) {
          setBookData(resp.data.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get Book",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await BookService.updateBook(id, bookData);
      if (resp.status === 200) {
        Swal.fire("Success", "Book updated successfully!", "success");
        navigate("/BookPage");
      }
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || e.message, "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">Update Book</h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              type="text"
              required
              onChange={handleChange}
              value={bookData.title}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              name="author"
              type="text"
              required
              onChange={handleChange}
              value={bookData.author}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              name="category"
              type="text"
              required
              onChange={handleChange}
              value={bookData.category}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Publish Year</label>
            <input
              name="publishYear"
              type="number"
              required
              onChange={handleChange}
              value={bookData.publishYear}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Publisher</label>
            <input
              name="publisher"
              type="text"
              required
              onChange={handleChange}
              value={bookData.publisher}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              required
              onChange={handleChange}
              value={bookData.description}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 rounded bg-gray-300 px-4 py-2 text-white hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
