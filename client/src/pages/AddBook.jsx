import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import BookService from "../services/book.sevices";

const AddBook = () => {
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
    location: "",
  });

  const navigate = useNavigate();

  const resetForm = () => {
    setBook({
      title: "",
      author: "",
      category: "",
      publishYear: "",
      isbn: "",
      publisher: "",
      edition: "",
      pageCount: 180,
      language: "",
      genre: "",
      description: "",
      coverImage: "",
      location: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBook = await BookService.createBook(book);
      if (newBook.status === 201) {
        Swal.fire({
          title: "เพิ่มหนังสือ",
          text: "เพิ่มหนังสือสำเร็จ",
          icon: "success",
        }).then(() => {
          resetForm();
          navigate("/book");
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: newBook.data.message || "เกิดข้อผิดพลาด",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #bdbdbd 0%, #616161 100%)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#222",
          padding: "2.5rem 2rem",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px rgba(44,62,80,0.25)",
          width: "100%",
          maxWidth: 500,
          color: "#bdbdbd",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontWeight: 700,
          }}
        >
          ➕ เพิ่มหนังสือ
        </h2>
        <form onSubmit={handleSubmit}>
          <label>ชื่อหนังสือ</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="ชื่อหนังสือ"
          />

          <label>ชื่อผู้แต่ง</label>
          <textarea
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "100px" }}
            placeholder="ชื่อผู้แต่ง"
          />

          <label>หมวดหมู่</label>
          <input
            type="text"
            name="category"
            value={book.category}
            onChange={handleChange}
            style={inputStyle}
            placeholder="หมวดหมู่"
          />

          <label>ปีที่ผลิต</label>
          <input
            type="text"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ปีที่ผลิต"
          />

          <label>เลขที่ผลิต</label>
          <input
            type="number"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            style={inputStyle}
            placeholder="เลขที่ผลิต"
          />

          <label>ผู้จัดพิมพ์</label>
          <input
            type="text"
            name="publisher"
            value={book.publisher}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="ผู้จัดพิมพ์"
          />

          <label>ฉบับ</label>
          <input
            type="text"
            name="edition"
            value={book.edition}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ฉบับ"
          />

          <label>จำนวนหน้า</label>
          <input
            type="number"
            name="pageCount"
            value={book.pageCount}
            onChange={handleChange}
            style={inputStyle}
            placeholder="จำนวนหน้า"
          />

          <label>ภาษา</label>
          <input
            type="text"
            name="language"
            value={book.language}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ภาษา"
          />

          <label>ประเภท</label>
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ประเภท"
          />

          <label>คำอธิบาย</label>
          <input
            type="text"
            name="description"
            value={book.description}
            onChange={handleChange}
            style={inputStyle}
            placeholder="คำอธิบาย"
          />

          <label>ภาพปก (URL)</label>
          <input
            type="text"
            name="coverImage"
            value={book.coverImage}
            onChange={handleChange}
            style={inputStyle}
            placeholder="URL ของภาพปก"
          />

          <label>หมวดหมู่สถานที่</label>
          <select
            name="location"
            value={book.location}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">-- เลือกหมวดหมู่สถานที่ --</option>
            <option value="shelf1">ชั้นวาง 1</option>
            <option value="shelf2">ชั้นวาง 2</option>
            <option value="storage">ห้องเก็บของ</option>
          </select>

          <button type="submit" style={buttonStyle}>
            เพิ่มหนังสือ
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: ".75rem",
  borderRadius: ".5rem",
  border: "1px solid #444",
  fontSize: "1rem",
  background: "#333",
  color: "#fff",
  marginBottom: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: ".75rem",
  borderRadius: ".5rem",
  background: "#616161",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1.1rem",
  border: "none",
  boxShadow: "0 2px 8px rgba(44,62,80,0.20)",
  cursor: "pointer",
  transition: "background .2s",
};

export default AddBook;
