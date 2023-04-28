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
      enum: ["wedding", "birthday", "baby", "house", "others"],
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
    eventImage: {
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

EventSchema.pre("save", function (next) {
  if (this.eventType === "wedding") {
    this.eventImage = "https://example.com/wedding.jpg";
  } else if (this.eventType === "birthday") {
    this.eventImage = "https://example.com/birthday.jpg";
  } else if (this.eventType === "baby") {
    this.eventImage = "https://example.com/baby.jpg";
  } else if (this.eventType === "house") {
    this.eventImage = "https://example.com/house.jpg";
  } else {
    this.eventImage = "https://example.com/others.jpg";
  }
  next();
});

const Events = mongoose.model("Events", EventSchema);
export default Events;
