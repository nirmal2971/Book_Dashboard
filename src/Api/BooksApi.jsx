import axios from "axios";

const API_BASE = "http://localhost:5000/books";

export const fetchBooks = async () => {
  const { data } = await axios.get(API_BASE);
  return data;
};

export const createBook = async (book) => {
  const { data } = await axios.post(API_BASE, book);
  return data;
};

export const updateBook = async ({ id, ...book }) => {
  const { data } = await axios.put(`${API_BASE}/${id}`, book);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await axios.delete(`${API_BASE}/${id}`);
  return data;
};
