import express from "express";
import {
  postEntry,
  getAllEntries,
  getEntryByEntryId,
  getAllEntriesByEventId,
  updateEntryByEntryId,
  deleteEntryByEntryId,
} from "../controllers/entries.js";

const router = express.Router();

router.post("/add", postEntry);
router.get("/all", getAllEntries);
router.get("/single/:entryId", getEntryByEntryId);
router.get("/all/:eventId", getAllEntriesByEventId);
router.put("/edit/:entryId", updateEntryByEntryId);
router.delete("/delete/:entryId", deleteEntryByEntryId);

export default router;
