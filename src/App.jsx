import React from "react";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BookTable from "./Components/BookTable";
import BookForm from "./Components/BookForm";
import { useBookUI } from "./context/BookUIContext";

export default function App() {
  const { openAdd } = useBookUI();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">📚 Book Management Dashboard</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAdd}
          >
            Add Book
          </Button>
        </Box>
        <BookTable />
      </Paper>
      <BookForm />
    </Container>
  );
}
