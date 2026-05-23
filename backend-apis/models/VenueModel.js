import mongoose from "mongoose";

const VenueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      required: [true, "Venue name is required"],
      unique: true,  // ✅ Only venueName is unique
      trim: true,
    },
    venueLocation: {
      type: String,
      required: [true, "Venue location is required"],
      trim: true,     // duplicate locations allowed
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Venue = mongoose.model("Venue", VenueSchema);

export default Venue;
