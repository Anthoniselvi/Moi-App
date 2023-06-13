import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import "./Navbar.css";

export default function SubWorks() {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        // border: "1px solid pink",
      }}
    >
      <Box className="subworks-inner-box">
        <Box className="subworks-text-box">
          <h2
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "38px",
              lineHeight: "46px",
              color: "#101a34",
            }}
          >
            Easily track your gifts
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
              Track your full history of received gifts.
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
              Never miss someone from the giftbook.
            </h4>
          </div>

          <Button
            onClick={navigateToSignUp}
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
        <Box className="subworks-img-box">
          <img
            src="/img/ph1.png"
            style={{ height: "80%", marginTop: "20px" }}
          />
        </Box>
      </Box>
    </div>
  );
}
