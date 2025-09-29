import { useState } from "react";

export default function BookPage() {
  const [book] = useState({
    itemId: "B002",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic Literature",
    publishYear: 1925,
    isbn: "978-0-7432-7356-5",
    publisher: "Scribner",
    status: "Available",
    coverImage: "https://example.com/cover.jpg",
    description: "A classic American novel",
    location: "A1-B2-C3",
    addedDate: "2023-09-29",

    edition: "First Edition",
    pageCount: 180,
    language: "English",
    genre: "Fiction",
  });

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-blue-600 font-medium text-lg">by {book.author}</p>

          <p className="text-sm text-gray-700 leading-relaxed">
            {book.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm mt-3 text-gray-800">
            <div>
              <strong>ISBN:</strong> {book.isbn}
            </div>
            <div>
              <strong>Publisher:</strong> {book.publisher}
            </div>
            <div>
              <strong>Year:</strong> {book.publishYear}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  book.status === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {book.status}
              </span>
            </div>
            <div>
              <strong>Edition:</strong> {book.edition}
            </div>
            <div>
              <strong>Pages:</strong> {book.pageCount}
            </div>
            <div>
              <strong>Language:</strong> {book.language}
            </div>
            <div>
              <strong>Genre:</strong> {book.genre}
            </div>
            <div className="col-span-2">
              <strong>Location:</strong> {book.location}
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Added on: {new Date(book.addedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
