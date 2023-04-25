import express from "express";
import {
  postProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controllers/profile.js";

const router = express.Router();

router.post("/profile", postProfile);
router.get("/all", getAllProfiles);
router.get("/:id", getProfileById);
router.put("/:id", updateProfile);

export default router;
