import mongoose from "mongoose";

const floorSchema = new mongoose.Schema(
  {
    floor: {
      type: String,
      required: [true, "Floor name is required"],
      trim: true,
      // unique: false (default), so duplicates allowed
    },
    boothName: {
      type: String,
      required: [true, "Booth name is required"],
      trim: true,
    },
    boothSize: {
      type: String,
      required: [true, "Booth size is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Floor = mongoose.model("Floor", floorSchema);
export default Floor;
