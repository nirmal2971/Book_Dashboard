import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { BookUIProvider } from "./context/BookUIContext"; 
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <BookUIProvider>
          <CssBaseline />
          <App />
        </BookUIProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
