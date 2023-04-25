import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
} from "../controllers/profile.js";

const router = express.Router();

router.post("/profile", postProfile);
router.get("/all", getAllProfiles);
router.get("/:id", getProfileById);

export default router;
