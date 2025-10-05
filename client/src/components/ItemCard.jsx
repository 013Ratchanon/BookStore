import { useEffect } from "react";
import Swal from "sweetalert2";
import BooksService from "../services/book.service";

const BookCard = ({ book }) => {
  useEffect(() => {}, []);
console.log(book);
  const handleDelete = async (id) => {
    try {
      const response = await BooksService.deleteBook(id);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted book",
          text: "book deleted successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2">{book.title}</h2>
        <p className="text-gray-700 text-base mb-2">{book.description}</p>

        <div className="text-sm text-gray-600 mb-1">
          <strong>หมวดหมู่</strong> {book.category}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>เผยแพร่</strong> {book.publishYear}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>ผู้เขียน</strong> {book.author}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>สถานะ</strong> {book.status}
        </div>

        {/* ปุ่ม Update และ Delete */}
        <div className="flex justify-between mt-4">
          <a
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-bold py-1 px-4 rounded"
           
            href={`/update/${book.itemId}`}
          >
            Update
          </a>
          <button
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-bold py-1 px-4 rounded"
            onClick={() => handleDelete(book.itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;