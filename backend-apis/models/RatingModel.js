import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link with User collection
      required: true,
    },

    status: {
      type: String,
      enum: ["approved", "pending"],
      default: "pending",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt (better than sendAt)
  }
);

export default mongoose.model("Rating", ratingSchema);
