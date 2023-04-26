import mongoose from "mongoose";
import autoIncrement from "mongoose-plugin-autoinc";

const { autoIncrementFactory } = autoIncrement;

const EventSchema = new mongoose.Schema(
  {
    eventId: {
      type: Number,
      unique: true,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    profileId: {
      type: String,
      required: true,
    },
  }
  // { timestamps: true }
);

EventSchema.plugin(autoIncrement.plugin, {
  model: "Event",
  field: "eventId",
  startAt: 1,
  incrementBy: 1,
});

const Events = mongoose.model("Events", EventSchema);
export default Events;
