import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    // 🔹 Linked exhibitor (the logged-in user)
    exhibitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Basic company details
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    productsOrServices: {
      type: String,
      required: [true, "Products or services are required"],
      trim: true,
    },
   image: {
      type: String, 
      trim: true, 
      default: "",
    },
    // 🔹 Company contact info
    companyEmail: {
      type: String,
      required: [true, "Company email is required"],
      trim: true,
      lowercase: true,
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    // 🔹 Profile info for exhibitor
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
