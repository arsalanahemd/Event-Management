import ExpoRegistration from "../models/RegistrationModel.js";

// 🟢 Register attendee for an expo
const registerForExpo = async (req, res) => {
  try {
    const { userId, expoId, status } = req.body;

    if (!userId || !expoId) {
      return res.status(400).json({
        success: false,
        message: "userId and expoId are required",
      });
    }

    // Check if already registered
    const exist = await ExpoRegistration.findOne({ userId, expoId });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "You are already registered for this expo",
      });
    }

    const registration = await ExpoRegistration.create({
      userId,
      expoId,
      status: status || "pending",
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully! Waiting for admin approval.",
      registration,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🔹 Fetch all registrations
// 🔹 Fetch all registrations (admin view)
const fetchAllRegistrations = async (req, res) => {
  try {
    const registrations = await ExpoRegistration.find()
      .populate("userId", "name email role")
      .populate({
        path: "expoId",
        select: "title date theme image venue startTime endTime speaker", // add these fields
        populate: [
          { path: "venue", select: "venueName venueLocation" },
          { path: "speaker", select: "name" }, // assuming speaker is a reference
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, registrations }); // includes status
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// 🔹 Fetch registrations by user
const fetchRegistrationsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const registrations = await ExpoRegistration.find({ userId })
      .populate({
        path: "expoId",
        select: "title date theme image venue startTime endTime speaker", // add startTime, endTime, speaker
        populate: [
          { path: "venue", select: "venueName venueLocation" },
          { path: "speaker", select: "name" }, // assuming speaker is a reference to User or Speaker model
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, registrations }); // includes status
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




// 🟠 Update registration (admin can approve/reject)
const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await ExpoRegistration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    if (status) registration.status = status;

    const updated = await registration.save();

    res.status(200).json({
      success: true,
      message: `Registration status updated to ${status}`,
      registration: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete registration
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const exist = await ExpoRegistration.findById(id);
    if (!exist) {
      return res.status(404).json({ success: false, message: "Registration not found" });
    }

    await ExpoRegistration.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Registration deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  registerForExpo,
  fetchAllRegistrations,
  fetchRegistrationsByUser,
  updateRegistration,
  deleteRegistration,
};
