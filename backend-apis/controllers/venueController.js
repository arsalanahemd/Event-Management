import Venue from "../models/VenueModel.js";

// 🟢 Create new Venue
const createVenue = async (req, res) => {
  try {
    const { venueName, venueLocation } = req.body;

    // ✅ Validation
    if (!venueName || !venueLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (venueName, venueLocation)",
      });
    }

    // ✅ Prevent duplicates for venueName (case-insensitive)
    const existingVenue = await Venue.findOne({
      venueName: { $regex: `^${venueName.trim()}$`, $options: "i" },
    });

    if (existingVenue) {
      return res.status(400).json({
        success: false,
        message: "This venue name already exists",
      });
    }

    // ✅ Create Venue
    const newVenue = await Venue.create({
      venueName: venueName.trim(),
      venueLocation: venueLocation.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Venue created successfully",
      venue: newVenue,
    });
  } catch (err) {
    console.error("Error creating venue:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🟡 Fetch all Venues
const fetchVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, venues });
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔵 Fetch single Venue by ID
const fetchVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.status(200).json({ success: true, venue });
  } catch (err) {
    console.error("Error fetching venue by ID:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟠 Update Venue
const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const { venueName, venueLocation } = req.body;

    const existing = await Venue.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    // ✅ Check venueName uniqueness on update (case-insensitive)
    if (venueName && venueName.trim().toLowerCase() !== existing.venueName.toLowerCase()) {
      const venueExists = await Venue.findOne({
        venueName: { $regex: `^${venueName.trim()}$`, $options: "i" },
        _id: { $ne: id },
      });

      if (venueExists) {
        return res.status(400).json({
          success: false,
          message: "This venue name already exists",
        });
      }
    }

    existing.venueName = venueName?.trim() || existing.venueName;
    existing.venueLocation = venueLocation?.trim() || existing.venueLocation;

    const updatedVenue = await existing.save();

    res.status(200).json({
      success: true,
      message: "Venue updated successfully",
      venue: updatedVenue,
    });
  } catch (err) {
    console.error("Error updating venue:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete Venue
const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    await Venue.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting venue:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createVenue, fetchVenues, fetchVenueById, updateVenue, deleteVenue };
