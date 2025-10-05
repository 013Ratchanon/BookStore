import api from "./api";

const API_URL = import.meta.env.VITE_BOOKS_API;

const createBook = async (data) => {
  return await api.post(`${API_URL}/`, data);
};

const getAllBooks = async () => {
  return await api.get(`${API_URL}/`);
};

const updateBook = async (id, book) => {
  return await api.put(`${API_URL}/${id}`, book);
};

const getBookById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const deleteBook = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ActivityService = {
  getAllBooks,
  deleteBook,
  createBook,
  updateBook,
  getBookById,
};

export default ActivityService;