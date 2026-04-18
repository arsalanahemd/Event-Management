import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Speaker name is required"],
      trim: true,
    },
    image: {
      type: String, // image filename or URL
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Speaker = mongoose.model("Speaker", speakerSchema);
export default Speaker;
