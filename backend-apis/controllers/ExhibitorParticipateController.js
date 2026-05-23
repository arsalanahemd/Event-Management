import Participation from "../models/ExhibitorParticipitorModel.js";
import Expo from "../models/ExpoModel.js";
import Company from "../models/CompanyModel.js";
import Floor from "../models/FloorModel.js";

/* =====================================================
   🟢 REGISTER EXHIBITOR FOR EXPO
===================================================== */
const registerExhibitor = async (req, res) => {
  try {
    const { exhibitorId, companyId, expoId } = req.body;

    if (!exhibitorId || !companyId || !expoId) {
      return res.status(400).json({
        success: false,
        message: "Exhibitor ID, Company ID, and Expo ID are required.",
      });
    }

    // ✅ Verify Expo exists
    const expo = await Expo.findById(expoId);
    if (!expo) {
      return res.status(404).json({ success: false, message: "Expo not found." });
    }

    // ✅ Verify company belongs to exhibitor
    const company = await Company.findById(companyId);
    if (!company || company.exhibitorId.toString() !== exhibitorId) {
      return res.status(403).json({
        success: false,
        message: "Company does not belong to the given exhibitor.",
      });
    }

    // ✅ Prevent duplicate participation
    const existing = await Participation.findOne({ exhibitorId, expoId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this expo.",
      });
    }

    // ✅ Create new participation
    const participation = await Participation.create({
      exhibitorId,
      companyId,
      expoId,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Participation request submitted successfully.",
      participation,
    });
  } catch (err) {
    console.error("❌ Error in registerExhibitor:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* =====================================================
   🟡 FETCH ALL PARTICIPATIONS (Admin)
===================================================== */
const fetchAllRegistrations = async (req, res) => {
  try {
    const records = await Participation.find()
      .populate("exhibitorId", "name email")
      .populate(
        "companyId",
        "companyName productsOrServices companyEmail contactNumber description image"
      )
      .populate({
        path: "expoId",
        select: "title date venue",
        populate: { path: "venue", select: "venueName" },
      })
      .populate("floor", "floorName floorNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, records });
  } catch (err) {
    console.error("❌ Error in fetchAllRegistrations:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


/* =====================================================
   🔵 FETCH PARTICIPATIONS BY EXPO ID
===================================================== */
const fetchRegistrationsByExpo = async (req, res) => {
  try {
    const { expoId } = req.params;

    const records = await Participation.find({ expoId })
      .populate("exhibitorId", "name email")
      .populate(
        "companyId",
        "companyName productsOrServices companyEmail contactNumber description image"
      )
     .populate("floor", "floor boothName boothSize status")
      .populate({
        path: "expoId",
        select: "title startTime endTime venue",
        populate: { path: "venue", select: "venueName" },
      });

    res.status(200).json({ success: true, records });
  } catch (err) {
    console.error("❌ Error in fetchRegistrationsByExpo:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



/* =====================================================
   🟢 FETCH PARTICIPATIONS BY EXHIBITOR ID (Frontend)
===================================================== */
const fetchRegistrationsByExhibitor = async (req, res) => {
  try {
    const { exhibitorId } = req.params;

    if (!exhibitorId) {
      return res.status(400).json({ success: false, message: "Exhibitor ID is required." });
    }

    const records = await Participation.find({ exhibitorId })
      .populate(
        "companyId",
        "companyName productsOrServices companyEmail contactNumber description image"
      )
      .populate("floor", "floor boothName boothSize status") // ✅ Corrected
      .populate({
        path: "expoId",
        select: "title startTime endTime venue date",
        populate: { path: "venue", select: "venueName" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, records });
  } catch (err) {
    console.error("❌ Error in fetchRegistrationsByExhibitor:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



/* =====================================================
   🟣 UPDATE PARTICIPATION (Admin: Assign Floor / Status)
===================================================== */
const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, floor } = req.body;

    const participation = await Participation.findById(id);
    if (!participation) {
      return res.status(404).json({ success: false, message: "Participation not found." });
    }

    if (status) participation.status = status;
    if (floor) participation.floor = floor;

    await participation.save();

const updated = await Participation.findById(id)
  .populate("exhibitorId", "name email")
  .populate(
    "companyId",
    "companyName productsOrServices companyEmail contactNumber description image"
  )
  .populate("expoId", "title date")
  .populate("floor", "floorName floorNumber");


    res.status(200).json({
      success: true,
      message: "Participation updated successfully.",
      participation: updated,
    });
  } catch (err) {
    console.error("❌ Error in updateRegistration:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


/* =====================================================
   🔴 DELETE PARTICIPATION
===================================================== */
const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const participation = await Participation.findByIdAndDelete(id);
    if (!participation) {
      return res.status(404).json({ success: false, message: "Participation not found." });
    }

    res.status(200).json({
      success: true,
      message: "Participation deleted successfully.",
    });
  } catch (err) {
    console.error("❌ Error in deleteRegistration:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  registerExhibitor,
  fetchAllRegistrations,
  fetchRegistrationsByExpo,
  fetchRegistrationsByExhibitor,
  updateRegistration,
  deleteRegistration,
};
