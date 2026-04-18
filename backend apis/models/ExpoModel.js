import mongoose from "mongoose";

const expoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Expo title is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Expo date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Venue",
    },
    description: {
      type: String,
      trim: true,
    },
    theme: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    speaker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker",
      required: false, // optional field
    },
  },
  { timestamps: true }
);

const Expo = mongoose.model("Expo", expoSchema);
export default Expo;
