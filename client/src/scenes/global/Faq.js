import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

export default function Faq() {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        padding: "2% 20%",
        backgroundColor: "#fff",
        color: "#121212",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Frequently Asked Questions</h1>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
        sx={{ backgroundColor: "#fff", color: "#121212" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel1" ? (
              <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            ) : (
              <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
        sx={{ backgroundColor: "#fff", color: "#121212" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel2" ? (
              <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            ) : (
              <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            )
          }
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleAccordionChange("panel3")}
        sx={{ backgroundColor: "#fff", color: "#121212" }}
      >
        <AccordionSummary
          expandIcon={
            expanded === "panel3" ? (
              <RemoveCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            ) : (
              <AddCircleOutlineIcon sx={{ color: "#50bcd9" }} />
            )
          }
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography sx={{ fontWeight: "bold" }}>Accordion 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
