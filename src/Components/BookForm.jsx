import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useBooks } from "../Hooks/UseBooks";
import { useBookUI } from "../context/BookUIContext";

export default function BookForm() {
  const { modalOpen, editing, close } = useBookUI();
  const { addBook, editBook } = useBooks();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      year: "",
      status: "Available",
    },
  });

  useEffect(() => {
    if (editing) {
      reset(editing);
    } else {
      reset({
        title: "",
        author: "",
        genre: "",
        year: "",
        status: "Available",
      });
    }
  }, [editing, reset]);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = (data) => {
    if (editing) {
      editBook.mutate(
        { id: editing._id ?? editing.id, ...data },
        {
          onSuccess: () => {
            setSnackbar({
              open: true,
              message: `"${data.title}" updated successfully`,
              severity: "success",
            });
            close();
          },
          onError: () => {
            setSnackbar({
              open: true,
              message: `Failed to update "${data.title}"`,
              severity: "error",
            });
          },
        }
      );
    } else {
      addBook.mutate(data, {
        onSuccess: () => {
          setSnackbar({
            open: true,
            message: `"${data.title}" added successfully`,
            severity: "success",
          });
          close();
        },
        onError: () => {
          setSnackbar({
            open: true,
            message: `Failed to add "${data.title}"`,
            severity: "error",
          });
        },
      });
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onClose={close} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Book" : "Add Book"}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label="Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
              <TextField
                label="Author"
                {...register("author", { required: "Author is required" })}
                error={!!errors.author}
                helperText={errors.author?.message}
                fullWidth
              />
              <TextField
                select
                label="Genre"
                defaultValue=""
                {...register("genre", { required: "Genre is required" })}
                error={!!errors.genre}
                helperText={errors.genre?.message}
                fullWidth
              >
                <MenuItem value="">Select Genre</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Non-fiction">Non-fiction</MenuItem>
                <MenuItem value="Sci-fi">Sci-fi</MenuItem>
                <MenuItem value="Biography">Biography</MenuItem>
              </TextField>
              <TextField
                label="Published Year"
                type="number"
                {...register("year", {
                  required: "Published year is required",
                  valueAsNumber: true,
                })}
                error={!!errors.year}
                helperText={errors.year?.message}
                fullWidth
              />
              <TextField
                select
                label="Status"
                defaultValue="Available"
                {...register("status", { required: "Status is required" })}
                error={!!errors.status}
                helperText={errors.status?.message}
                fullWidth
              >
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Issued">Issued</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
    </>
  );
}
