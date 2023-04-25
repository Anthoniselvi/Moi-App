import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  profileId: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
});

const Profiles = mongoose.model("Profiles", ProfileSchema);
export default Profiles;
