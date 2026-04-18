import Speaker from "../models/SpeakerModel.js";

// ========== CREATE SPEAKER ==========
const createSpeaker = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Speaker name is required" });
    }

    // Handle uploaded image (multer)
    const image = req.file ? req.file.filename : "";

    const speaker = await Speaker.create({ name, image });

    res.status(201).json({
      success: true,
      message: "Speaker created successfully",
      speaker,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== UPDATE SPEAKER ==========
const updateSpeaker = async (req, res) => {
  try {
    const { name } = req.body;
    const speaker = await Speaker.findById(req.params.id);

    if (!speaker) {
      return res
        .status(404)
        .json({ success: false, message: "Speaker not found" });
    }

    speaker.name = name || speaker.name;
    if (req.file) speaker.image = req.file.filename;

    await speaker.save();

    res
      .status(200)
      .json({ success: true, message: "Speaker updated", speaker });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== FETCH ALL SPEAKERS ==========
const fetchSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, speakers });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== FETCH SINGLE SPEAKER ==========
const fetchSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);
    if (!speaker)
      return res
        .status(404)
        .json({ success: false, message: "Speaker not found" });
    res.status(200).json({ success: true, speaker });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ========== DELETE SPEAKER ==========
const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!speaker)
      return res
        .status(404)
        .json({ success: false, message: "Speaker not found" });
    res
      .status(200)
      .json({ success: true, message: "Speaker deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createSpeaker,
  updateSpeaker,
  fetchSpeakers,
  fetchSpeakerById,
  deleteSpeaker,
};
