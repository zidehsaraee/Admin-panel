import React from "react";
import { Stack, Alert } from "@mui/material";

export default function MessageBox({ type, message }) {
  return (
    <Stack sx={{ width: "100%", mb: "20px" }} spacing={2}>
      <Alert
        sx={{ fontSize: "20px", display: "flex", alignItems: "center" }}
        severity={type}
      >
        {message}
      </Alert>
    </Stack>
  );
}
