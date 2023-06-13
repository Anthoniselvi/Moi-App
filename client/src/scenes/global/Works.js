import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import "./Navbar.css";

export default function Works() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div
      id="works"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        // border: "1px solid pink",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "10%",
          // border: "1px solid green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
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
      </div>

      <Box className="works-inner-box">
        <Box className="works-img-box">
          <img
            src="/img/ph1.png"
            style={{ height: "80%", marginTop: "20px" }}
          />
        </Box>
        <Box className="works-text-box">
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
            onClick={navigateToLogin}
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
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#101a34",
                border: "1px solid #101a34",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </div>
  );
}
