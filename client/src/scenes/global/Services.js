import React from "react";
import "./Navbar.css";
import { Box } from "@mui/material";

export default function Services() {
  return (
    <div className="services-container">
      <h1>SERVICES</h1>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <img src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" /> */}
        <Box sx={{ border: "1px solid red", height: "300px", width: "300px" }}>
          Create Events
        </Box>
        <Box sx={{ border: "1px solid red", height: "300px", width: "300px" }}>
          Add / Update Moi Entry
        </Box>
        <Box sx={{ border: "1px solid red", height: "300px", width: "300px" }}>
          Reports for Moi Entry
        </Box>
      </Box>
    </div>
  );
}
