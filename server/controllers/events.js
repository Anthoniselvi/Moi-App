import Events from "../models/Events.js";

export const postEvent = (req, res) => {
  //   const profileId = req.body.profileId;
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

export const getEventById = (req, res) => {
  const eventId = req.params.id;
  Events.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json("Event not found");
      }
      res.json(event);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateEvent = (req, res) => {
  Events.findById(req.params.id)
    .then((event) => {
      // event.profileId = req.body.profileId;
      event.eventType = req.body.eventType;
      event.name = req.body.name;
      event.place = req.body.place;
      event.date = req.body.date;
      event.profileId = req.body.profileId;

      event
        .save()
        .then(() => res.json("Event updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};
