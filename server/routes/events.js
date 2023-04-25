import express from "express";
import {
  postEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/events.js";

const router = express.Router();

router.post("/add", postEvent);
router.get("/all", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);

export default router;
