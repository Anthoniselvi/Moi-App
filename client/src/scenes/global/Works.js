import React from "react";
import { Box } from "@mui/material";

export default function Works() {
  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px" }}>
      <h1>How It Works</h1>
      <Box sx={{ display: "flex", padding: "20px" }}>
        <Box sx={{ display: "flex", padding: "20px", border: "1px solid red" }}>
          Left
        </Box>
        <Box
          sx={{ display: "flex", padding: "20px", border: "1px solid green" }}
        >
          Right
        </Box>
      </Box>
    </div>
  );
}
