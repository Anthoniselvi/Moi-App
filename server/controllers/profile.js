import Profiles from "../models/Profile.js";

export const postProfile = (req, res) => {
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
};

export const getAllProfiles = (req, res) => {
  Profiles.find()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getProfileById = (req, res) => {
  const profileId = req.params.id;
  Profiles.findById(profileId)
    .then((profile) => {
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      res.json(profile);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
