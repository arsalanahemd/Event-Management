import Rating from "../models/RatingModel.js";

// 🟢 Create new rating
const createRating = async (req, res) => {
  try {
    const { fullName, email, rating, message, userId } = req.body;

    if (
      !fullName ||
      !email ||
      !rating ||
      !message ||
      !userId ||
      fullName.trim() === "" ||
      email.trim() === "" ||
      message.trim() === "" ||
      userId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const newRating = await Rating.create({
      userId,
      fullName,
      email,
      rating,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully!",
      rating: newRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🟡 Fetch all ratings (Admin)
const fetchRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔵 Fetch ratings by user
const fetchRatingsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const ratings = await Rating.find({ userId })
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, ratings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟠 Update rating (Admin or user)
const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, message, status } = req.body;

    const existingRating = await Rating.findById(id);
    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }
      existingRating.rating = rating;
    }

    existingRating.message = message || existingRating.message;

    // optional admin status (approved / hidden)
    if (status) {
      existingRating.status = status;
    }

    const updatedRating = await existingRating.save();

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      rating: updatedRating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete rating
const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findById(id);
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: "Rating does not exist",
      });
    }

    await Rating.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Rating deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟣 Update rating status only
const updateRatingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Rating.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Rating marked as ${status}`,
      rating: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createRating,
  fetchRatings,
  fetchRatingsByUser,
  updateRating,
  deleteRating,
  updateRatingStatus,
};
