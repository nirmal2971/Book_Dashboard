import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Chip
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useBooks } from "../Hooks/UseBooks";
import { useBookUI } from "../context/BookUIContext";
import "../styles/BookStyles.css";

export default function BookTable() {
  const { booksQuery, removeBook } = useBooks();
  const { openEdit } = useBookUI();

  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const rowsPerPage = 10;

  const filteredBooks = useMemo(() => {
    const books = Array.isArray(booksQuery.data) ? booksQuery.data : [];
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter ? book.genre === genreFilter : true;
      const matchesStatus = statusFilter ? book.status === statusFilter : true;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [booksQuery.data, search, genreFilter, statusFilter]);

  const paginatedBooks = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredBooks.slice(start, start + rowsPerPage);
  }, [filteredBooks, page]);

  const handleDelete = (book) => {
    const id = book.id ?? book._id;

    if (!id) {
      setSnackbar({
        open: true,
        message: "Book ID is undefined!",
        severity: "error",
      });
      return;
    }

    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      removeBook.mutate(id, {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `"${book.title}" deleted successfully`,
            severity: "success",
          });
        },
        onError: (err) => {
          setSnackbar({
            open: true,
            message: `Error deleting "${book.title}"`,
            severity: "error",
          });
        },
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (booksQuery.isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (booksQuery.isError) {
    return <p>Error loading books.</p>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search by Title/Author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genreFilter}
            label="Genre"
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-fiction">Non-fiction</MenuItem>
            <MenuItem value="Sci-fi">Sci-fi</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Issued">Issued</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Published Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book) => {
              const bookId = book.id ?? book._id;
              return (
                <TableRow key={bookId} className="table-row">
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>
                    <Chip
                      label={book.status}
                      color={
                        book.status === "Available" ? "success" : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      className="icon-button"
                      onClick={() => openEdit(book)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      className="icon-button"
                      onClick={() => handleDelete(book)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack alignItems="center" mt={2}>
        <Pagination
          count={Math.ceil(filteredBooks.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ borderRadius: "12px", width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
