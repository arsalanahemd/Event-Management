import express from "express";
import * as rating from "../controllers/ratingController.js";

const ratingRouter = express.Router();

// 🟢 Create new rating
ratingRouter.post("/", rating.createRating);

// 🟡 Fetch all ratings (Admin)
ratingRouter.get("/", rating.fetchRatings);

// 🔵 Fetch ratings by user
ratingRouter.get("/user", rating.fetchRatingsByUser);

// 🟠 Update rating
ratingRouter.put("/:id", rating.updateRating);

// 🟣 Update rating status only (Admin)
ratingRouter.patch("/:id/status", rating.updateRatingStatus);

// 🔴 Delete rating
ratingRouter.delete("/:id", rating.deleteRating);

export default ratingRouter;
