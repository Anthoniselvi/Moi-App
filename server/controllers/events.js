import Events from "../models/Events.js";

export const postEvent = (req, res) => {
  const eventType = req.body.eventType;
  const name = req.body.name;
  const place = req.body.place;
  const date = req.body.date;
  const profileId = req.body.profileId;

  const newEvent = new Events({
    eventType,
    name,
    place,
    date,
    profileId,
  });

  if (eventType === "wedding") {
    newEvent.eventImage = "https://example.com/wedding.jpg";
  } else if (eventType === "birthday") {
    newEvent.eventImage = "https://example.com/birthday.jpg";
  } else if (eventType === "baby") {
    newEvent.eventImage = "https://example.com/baby.jpg";
  } else if (eventType === "house") {
    newEvent.eventImage = "https://example.com/house.jpg";
  } else {
    newEvent.eventImage = "https://example.com/others.jpg";
  }

  newEvent
    .save()
    .then(() => res.json("Event added"))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllEvents = (req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params
  Events.findOne({ eventId }) // Use eventId instead of _id
    .then((event) => {
      if (!event) {
        return res.status(404).json("Event not found");
      }
      res.json(event);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getEventsByProfileId = (req, res) => {
  const profileId = req.params.profileId;
  Events.find({ profileId: profileId })
    .then((events) => {
      if (!events || events.length === 0) {
        return res.status(404).json("Events not found");
      }
      res.json(events);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params
  Events.findOne({ eventId })
    .then((event) => {
      // event.profileId = req.body.profileId;
      event.eventType = req.body.eventType;
      event.name = req.body.name;
      event.place = req.body.place;
      event.date = req.body.date;
      // event.profileId = req.body.profileId;

      event
        .save()
        .then(() => res.json("Event updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

export const deleteEventByEventId = (req, res) => {
  const eventId = req.params.eventId; // Extract eventId from req.params
  Events.deleteOne({ eventId: eventId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json("Event not found");
      }
      res.json("Event deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
