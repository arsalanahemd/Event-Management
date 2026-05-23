import Expo from "../models/ExpoModel.js";

// ========== CREATE EXPO ==========
const createExpo = async (req, res) => {
  try {
    const { title, date, venue, description, theme, status, startTime, endTime, speaker } = req.body;

    if (!title || !date || !venue || !startTime) {
      return res.status(400).json({
        success: false,
        message: "Title, date, venue, and start time are required",
      });
    }

    // ✅ Check if this venue already has an expo on the same date
    const existingExpo = await Expo.findOne({ venue, date });
    if (existingExpo) {
      return res.status(400).json({
        success: false,
        message: `This venue already has an expo scheduled on ${date}`,
      });
    }

    // Handle uploaded image
    const image = req.file ? req.file.filename : "";

    const expo = await Expo.create({
      title,
      date,
      venue,
      description,
      theme,
      startTime,
      endTime,
      status: status || "upcoming",
      image,
      speaker: speaker || null, // optional speaker reference
    });

    res.status(201).json({
      success: true,
      message: "Expo created successfully",
      expo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ========== UPDATE EXPO ==========
const updateExpo = async (req, res) => {
  try {
    const { title, date, venue, description, theme, status, startTime, endTime, speaker } = req.body;

    const expo = await Expo.findById(req.params.id);
    if (!expo) {
      return res.status(404).json({ success: false, message: "Expo not found" });
    }

    // ✅ Check for conflict if date and venue changed
    if (venue && date) {
      const conflict = await Expo.findOne({
        venue,
        date,
        _id: { $ne: expo._id },
      });
      if (conflict) {
        return res.status(400).json({
          success: false,
          message: "This venue already has an expo on the selected date",
        });
      }
    }

    // Update fields
    expo.title = title || expo.title;
    expo.date = date || expo.date;
    expo.venue = venue || expo.venue;
    expo.description = description || expo.description;
    expo.theme = theme || expo.theme;
    expo.status = status || expo.status;
    expo.startTime = startTime || expo.startTime;
    expo.endTime = endTime || expo.endTime;
    expo.speaker = speaker || expo.speaker;

    if (req.file) expo.image = req.file.filename;

    await expo.save();

    // Populate venue and speaker for response
    const populatedExpo = await Expo.findById(expo._id).populate("venue").populate("speaker");

    res.status(200).json({ success: true, message: "Expo updated", expo: populatedExpo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ========== FETCH ALL ==========
const fetchExpos = async (req, res) => {
  try {
    const expos = await Expo.find().populate("venue").populate("speaker").sort({ date: -1 });
    res.status(200).json({ success: true, expos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ========== FETCH SINGLE ==========
const fetchExpoById = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id).populate("venue").populate("speaker");
    if (!expo) return res.status(404).json({ success: false, message: "Expo not found" });
    res.status(200).json({ success: true, expo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ========== DELETE ==========
const deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findByIdAndDelete(req.params.id);
    if (!expo) return res.status(404).json({ success: false, message: "Expo not found" });
    res.status(200).json({ success: true, message: "Expo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createExpo, updateExpo, fetchExpos, fetchExpoById, deleteExpo };
