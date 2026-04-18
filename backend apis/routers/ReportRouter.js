import express from "express";
import User from "../models/userModel.js";
import Registration from "../models/RegistrationModel.js";
import Company from "../models/CompanyModel.js";
import Message from "../models/ContactModel.js";
import Venue from "../models/VenueModel.js";
import Speaker from "../models/SpeakerModel.js";

const router = express.Router();

/* =====================================================
   📊 1️⃣ Summary Report
===================================================== */
router.get("/summary", async (req, res) => {
  try {
    const [
      totalUsers,
      totalRegistrations,
      totalExhibitors,
      totalMessages,
      totalVenues,
      totalSpeakers,
    ] = await Promise.all([
      User.countDocuments(),
      Registration.countDocuments(),
      Company.countDocuments(),
      Message.countDocuments(),
      Venue.countDocuments(),
      Speaker.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        registrations: totalRegistrations,
        exhibitors: totalExhibitors,
        messages: totalMessages,
        venues: totalVenues,
        speakers: totalSpeakers,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching report summary:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching report summary",
    });
  }
});

/* =====================================================
   📈 2️⃣ Monthly Registrations (for Line Chart)
===================================================== */
router.get("/registrations-per-month", async (req, res) => {
  try {
    const registrations = await Registration.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const data = registrations.map((r) => ({
      month: monthNames[r._id - 1],
      count: r.count,
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error fetching monthly registrations:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching monthly registrations",
    });
  }
});

/* =====================================================
   🥧 3️⃣ User Role Distribution (for Pie Chart)
===================================================== */
router.get("/users-by-role", async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          value: { $sum: 1 },
        },
      },
    ]);

    const data = usersByRole.map((item) => ({
      role: item._id || "Unknown",
      value: item.value,
    }));

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error fetching users by role:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user role data",
    });
  }
});

export default router;
