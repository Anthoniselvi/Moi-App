import Profiles from "../models/Profile.js";

export const postProfile = (req, res) => {
  console.log("postProfile called");
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

export const getProfile = (req, res) => {
  Profiles.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
};

// export const getUser = async (req, res) => {
//   try {
//     const { profileId } = req.params;
//     const profile = await Profiles.findById(profileId);
//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
