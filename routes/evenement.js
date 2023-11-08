// routes/evenement.js
const express = require("express");
const router = express.Router();
const Evenement = require("../models/evenement");

// Create a new evenement
router.post("/evenements", async (req, res) => {
  try {
    const evenement = new Evenement(req.body);
    await evenement.save();
    res.status(201).json(evenement);
  } catch (error) {
    res.status(400).json({ error: "Failed to create evenement" });
  }
});

// Get all evenements
router.get("/evenements", async (req, res) => {
  try {
    const evenements = await Evenement.find();
    res.json(evenements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch evenements" });
  }
});

// Get a specific evenement by ID
router.get("/evenements/:id", async (req, res) => {
  try {
    const evenement = await Evenement.findById(req.params.id);
    if (!evenement) {
      return res.status(404).json({ error: "Evenement not found" });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch evenement" });
  }
});

// Update an evenement by ID
router.put("/evenements/:id", async (req, res) => {
  try {
    const evenement = await Evenement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evenement) {
      return res.status(404).json({ error: "Evenement not found" });
    }
    res.json(evenement);
  } catch (error) {
    res.status(500).json({ error: "Failed to update evenement" });
  }
});

// Delete an evenement by ID
router.delete("/evenements/:id", async (req, res) => {
  try {
    const evenement = await Evenement.findByIdAndDelete(req.params.id);
    if (!evenement) {
      return res.status(404).json({ error: "Evenement not found" });
    }
    res.json({ message: "Evenement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete evenement" });
  }
});

module.exports = router;
