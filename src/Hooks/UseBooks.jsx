import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, createBook, updateBook, deleteBook } from "../Api/BooksApi";

export function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const addBook = useMutation({
    mutationFn: createBook,
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });

  const editBook = useMutation({
    mutationFn: updateBook,
    onSuccess: () => queryClient.invalidateQueries(["books"]),
  });

  const removeBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => queryClient.invalidateQueries(["books"]),
    onError: (error) => console.error("Error deleting book:", error),
  });

  return { booksQuery, addBook, editBook, removeBook };
}
