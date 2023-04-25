import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      //   enum: ["birthday", "wedding", "baby", "others"],
      //   default: "birthday",
    },
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: String,
    profileId: Number,
  }
  //   { timestamps: true }
);

const Events = mongoose.model("Events", EventSchema);
export default Events;
