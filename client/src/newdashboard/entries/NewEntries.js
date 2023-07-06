import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Avatar from "react-avatar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NewCreateEntry from "./NewCreateEntry";
import NewEditEntry from "./NewEditEntry";
import NewDeleteEntry from "./NewDeleteEntry";

export const RefreshContext = createContext({
  updateRefreshCount: () => {},
});
const NewEntries = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGift, setTotalGift] = useState(0);

  const [refreshCount, setRefreshCount] = useState(0);

  const updateRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  function refreshPage() {
    updateRefreshCount();
  }
  const createEntry = () => {
    setCreateModalOpen(true);
  };
  const handleDeleteEntry = (e, entryId) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
    setSelectedRowId(entryId);
  };

  const handleEditEntry = (entryId) => {
    setEditModalOpen(true);
    setSelectedRowId(entryId);
  };

  const navigateToEventsPage = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);

        console.log("Totals : " + JSON.stringify(response.data));
        // setProfileId(response.data.profileId);
        navigate(`/events?profile=${response.data.profileId}`);
      });
  };
  const getSelectedEvent = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/events/single/${eventId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/entries/all/${eventId}`)
      .then((response) => {
        // console.log(response);
        // console.log("fetchAllEntries : " + JSON.stringify(response.data));
        console.log(
          "fetchAllEntries : " + JSON.stringify(response.data.entriesList)
        );
        console.log(
          "totalAmount : " + JSON.stringify(response.data.totalAmount)
        );
        setEntries(response.data.entriesList);
        setTotalAmount(response.data.totalAmount);
        setTotalGift(response.data.totalGift);
      });
  };
  useEffect(() => {
    getSelectedEvent();
    fetchAllEntries();
  }, [refreshCount]);

  return (
    <RefreshContext.Provider value={{ updateRefreshCount }}>
      <Box m="20px" width="100%" height="100%">
        <Box
          //   border="1px solid red"
          width="100%"
          //   pr="20px"
          //   mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          justifyContent="space-between"
          //   gridAutoRows="90px"
          gap="20px"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
          }}
        >
          {/* <Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px"  > */}
          {entries.length > 0 && (
            <>
              {entries.map((entry, index) => (
                <Box
                  gridColumn="span 6"
                  key={index}
                  onClick={() => handleEditEntry(entry.entryId)}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="20px"
                  padding="2% 4%"
                  borderRadius="10px"
                  sx={{ backgroundColor: "#48cae4" }}
                >
                  <Box
                    display="flex"
                    gap="20%"
                    onClick={() => handleEditEntry(entry.entryId)}
                  >
                    <Avatar
                      name={entry.personName}
                      size="40"
                      round={true}
                      maxInitials="1"
                    />

                    <Box
                      display="flex"
                      flexDirection="column"
                      gap="5%"
                      alignItems="flex-start"
                    >
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ color: "#023e8a", fontWeight: 600 }}
                        textTransform="capitalize"
                      >
                        {entry.personName}
                      </Typography>
                      <Typography
                        variant="h6"
                        textTransform="capitalize"
                        sx={{ color: colors.grey[100] }}
                      >
                        {entry.city}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => handleEditEntry(entry.entryId)}
                  >
                    {entry.presentType === "amount" ? (
                      <Typography
                        variant="h4"
                        sx={{ color: "#023e8a", fontWeight: 600 }}
                      >
                        ₹ {entry.amount}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h4"
                        sx={{ color: "#023e8a", fontWeight: 600 }}
                      >
                        {entry.gift}
                      </Typography>
                    )}

                    <Box>
                      {/* <EditOrDelete entryId={entry.entryId} /> */}
                      <Button
                        style={{ color: "#fff" }}
                        onClick={(e) => handleDeleteEntry(e, entry.entryId)}
                      >
                        {" "}
                        <Delete />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>

        {createModalOpen ? (
          <NewCreateEntry
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            eventId={eventId}
          />
        ) : (
          <></>
        )}
        {editModalOpen ? (
          <NewEditEntry
            entryId={selectedRowId}
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
          />
        ) : (
          <></>
        )}
        {deleteModalOpen ? (
          <NewDeleteEntry
            entryId={selectedRowId}
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          />
        ) : (
          <></>
        )}
      </Box>
    </RefreshContext.Provider>
  );
};

export default NewEntries;
