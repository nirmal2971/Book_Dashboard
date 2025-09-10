import React, { createContext, useContext, useState } from "react";

const BookUIContext = createContext();

export function BookUIProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (book) => {
    setEditing(book);
    setModalOpen(true);
  };

  const close = () => {
    setEditing(null);
    setModalOpen(false);
  };

  return (
    <BookUIContext.Provider
      value={{ modalOpen, editing, openAdd, openEdit, close }}
    >
      {children}
    </BookUIContext.Provider>
  );
}

export const useBookUI = () => useContext(BookUIContext);
