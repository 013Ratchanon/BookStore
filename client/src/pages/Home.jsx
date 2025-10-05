import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BookService from "../services/book.services.js";

const Book = () => {
  const [books, setBooks] = useState([]);

  // ดึงข้อมูลหนังสือทั้งหมด
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const response = await BookService.getAllBooks();
      if (response.status === 200) {
        setBooks(response.data.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Get All Books",
        icon: "error",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  
const handleDelete = async (id) => {
  console.log("Deleting id:", id);
  if (!id) {
    Swal.fire("Error", "ไม่พบ ID ของหนังสือ", "error");
    return;
  }

  const confirm = await Swal.fire({
    title: "ยืนยันการลบ?",
    text: "คุณแน่ใจหรือไม่ว่าต้องการลบหนังสือเล่มนี้?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  });

  if (confirm.isConfirmed) {
    try {
      await BookService.deleteBook(id);
      Swal.fire("สำเร็จ", "ลบหนังสือเรียบร้อยแล้ว", "success");
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      Swal.fire(
        "ผิดพลาด",
        error?.response?.data?.message || "เกิดข้อผิดพลาดในการลบ",
        "error"
      );
    }
  }
};



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
          📚 Books
        </h1>
        <Link to="/AddBook" className="btn btn-success text-white px-6 py-2">
          ➕ Add Book
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id || book._id}
              className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* รูปภาพหนังสือ */}
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-gray-600 mb-2">Category: {book.category}</p>

                {/* ปุ่มแก้ไข / ลบ */}
                <div className="flex gap-2">
                  <Link
                    to={`/update/${book.itemId || book._id}`}
                    className="inline-block mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(book.itemId|| book._id)}
                    className="inline-block mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            ไม่มีหนังสือในระบบ
          </p>
        )}
      </div>
    </div>
  );
};

export default Book;
