import React from "react";
import { Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SubWorks() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          gap: "5%",
          width: "95%",
          height: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            // border: "1px solid green",
            width: "50%",
            height: "100%",
          }}
        >
          <h2 style={{ color: "#121212" }}>Easily Send Thank You Cards</h2>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* <CheckCircleOutlineIcon sx={{ color: "#50bcd9" }} /> */}
            <img
              src="/img/check.png"
              style={{ width: "20px", height: "20px" }}
            />
            <h4 style={{ color: "#121212" }}> Choose Thank you cards</h4>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* <CheckCircleOutlineIcon sx={{ color: "#50bcd9" }} />  */}
            <img
              src="/img/check.png"
              style={{ width: "20px", height: "20px" }}
            />

            <h4 style={{ color: "#121212" }}> Send Cards to Seleted Names</h4>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* <CheckCircleOutlineIcon sx={{ color: "#50bcd9" }} />  */}
            <img
              src="/img/check.png"
              style={{ width: "20px", height: "20px" }}
            />

            <h4 style={{ color: "#121212" }}>
              Download Reports by the Event Name
            </h4>
          </div>
          <Button
            sx={{
              backgroundColor: "#101a34",
              color: "#fff",
              width: "20%",
              marginTop: "20px",
            }}
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 50px",
            // border: "1px solid red",
            width: "50%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "#b7e5fc",
            borderRadius: "10px",
          }}
        >
          <img src="/img/mobile.png" style={{ height: "100%" }} />
        </Box>
      </Box>
    </div>
  );
}
