import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ye link karega user collection se
    required: true,
  },
  sendAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["seen", "unseen"], // dono values allowed
    default: "unseen", // default new message unseen hoga
  },
});

export default mongoose.model("Contact", contactSchema);
