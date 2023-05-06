import { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchTable from "./SearchTable";

export default function SearchBox({ searchResult, eventsList, searchName, setSearchName }) {
//   const [searchName, setSearchName] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  return (
    <Box sx={{ p: 2 }}>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <Typography variant="h5" fontWeight="600">
        Search by Name
      </Typography>
      
      <Box >
      
        {showSearch ? (
          <TextField sx={{width: "150px"}}
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by Name"
          />
        ) : 
        <IconButton onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>}
      </Box>
     </Box>
      <Box>
        <SearchTable searchResult={searchResult} eventsList={eventsList} />
      </Box>
    </Box>
  );
}
