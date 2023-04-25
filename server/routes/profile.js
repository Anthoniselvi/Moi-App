import express from "express";
import { postProfile, getProfile } from "../controllers/profile.js";
import Profiles from "../models/Profile.js";

const router = express.Router();

// console.log("Registering /profile route");
// router.post("/profile", postProfile);
// router.get("/", getProfile);

router.route("/profile").post((req, res) => {
  const profileId = req.body.profileId;
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;

  const newProfile = new Profiles({
    profileId,
    name,
    mobile,
    email,
  });

  newProfile
    .save()
    .then(() => res.json("Profile added"))
    .catch((err) => res.status(400).json("Error : " + err));
});

export default router;
