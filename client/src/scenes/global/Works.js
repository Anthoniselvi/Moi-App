import React from "react";
import { Box, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Works() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h1
        style={{
          color: "#101a34",
          fontWeight: 600,
          fontFamily: "Poppins",
          fontSize: "38px",
          lineHeight: "46px",
          textAlign: "center",
        }}
      >
        How It Works
      </h1>
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
          <img
            src="/img/ph1.png"
            style={{ height: "100%", marginTop: "20px" }}
          />
        </Box>
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
          <h2
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "38px",
              lineHeight: "46px",
              color: "#101a34",
            }}
          >
            Create a registry for each ocassion
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* <CheckCircleOutlineIcon sx={{ color: "#50bcd9" }} /> */}
            <img
              src="/img/check.png"
              style={{ width: "20px", height: "20px" }}
            />
            <h4
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#101a34",
              }}
            >
              Record the gift details for birthdays, weddings, housewarming,
              ear-piercing, and more.
            </h4>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* <CheckCircleOutlineIcon sx={{ color: "#50bcd9" }} />  */}
            <img
              src="/img/check.png"
              style={{ width: "20px", height: "20px" }}
            />

            <h4
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "22px",
                color: "#101a34",
              }}
            >
              Share your list with your spouse and family.
            </h4>
          </div>
        
          <Button
            sx={{
              backgroundColor: "#101a34",
              color: "#fff",
              width: "30%",
              marginTop: "20px",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
              fontFamily: "Poppins",
              borderRadius: "7px",
              border: "1px solid #101a34",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </div>
  );
}
