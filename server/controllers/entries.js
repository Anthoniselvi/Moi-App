import Entries from "../models/Entries.js";

export const postEntry = (req, res) => {
  const personName = req.body.personName;
  const city = req.body.city;
  const presentType = req.body.presentType;
  const amount = req.body.amount;
  const gift = req.body.gift;
  const eventId = req.body.eventId;

  const newEntry = new Entries({
    personName,
    city,
    presentType,
    amount,
    gift,
    eventId,
  });

  newEntry
    .save()
    .then(() => res.json("New Entry added"))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getAllEntries = (req, res) => {
  Entries.find()
    .then((entries) => res.json(entries))
    .catch((err) => res.status(400).json("Error : " + err));
};

export const getEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.findOne({ entryId: entryId }) // Use eventId instead of _id
    .then((entry) => {
      if (!entry) {
        return res.status(404).json("Entry not found");
      }
      res.json(entry);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllEntriesByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Entries.find({ eventId: eventId })
    .then((entries) => {
      if (!entries || entries.length === 0) {
        return res.status(404).json("Entries not found");
      }
      res.json(entries);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.findOne({ entryId: entryId })
    .then((entry) => {
      entry.personName = req.body.personName;
      entry.city = req.body.city;
      entry.presentType = req.body.presentType;
      entry.amount = req.body.amount;
      entry.gift = req.body.gift;

      entry
        .save()
        .then(() => res.json("Entry updated"))
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

export const deleteEntryByEntryId = (req, res) => {
  const entryId = req.params.entryId; // Extract eventId from req.params
  Entries.deleteOne({ entryId: entryId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json("Entry not found");
      }
      res.json("Entry deleted successfully");
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
