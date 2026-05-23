import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema(
  {
    exhibitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    expoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expo",
      required: true,
    },

    // Admin-assigned fields
    floor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floor",
      default: null, // Admin assigns later
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending", // Default status until admin updates
    },
  },
  { timestamps: true }
);

// Optional: Prevent duplicate registrations for the same exhibitor & expo
ParticipationSchema.index({ exhibitorId: 1, expoId: 1 }, { unique: true });

export default mongoose.model("Participation", ParticipationSchema);
