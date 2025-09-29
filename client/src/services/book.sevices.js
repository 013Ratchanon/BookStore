import api from "./api";
const API_URL = import.meta.env.VITE_BOOK_API;

// สร้างกิจกรรม
const createBook = async (bookData) => {
  return await api.post("/api/books", bookData);
};

// ดึงข้อมูลกิจกรรมทั้งหมด (GET ไม่มี body data)
const getAllBook = async () => {
  return await api.get(`${API_URL}/`);
};

// ดึงข้อมูลกิจกรรมตาม id
const getById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};
const updateBook = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};

const BookService = {
  createBook,
  getAllBook,
  getById,
  updateBook,
};

export default BookService;
