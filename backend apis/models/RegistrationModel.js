import mongoose from "mongoose";

const expoRegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expoId: { type: mongoose.Schema.Types.ObjectId, ref: "Expo", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const expoRegistration = mongoose.model("expoRegistration", expoRegistrationSchema)

export default expoRegistration;
