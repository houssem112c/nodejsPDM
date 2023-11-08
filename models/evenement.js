// models/evenement.js
const mongoose = require("mongoose");

const evenementSchema = mongoose.Schema({
  namee: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  imagess: {
    type: String,
    required: true,
  },
});

const Evenement = mongoose.model("Evenement", evenementSchema ,"evenement");

module.exports = Evenement;
