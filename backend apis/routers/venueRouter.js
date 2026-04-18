import express from "express";
import * as venue from "../controllers/venueController.js";

const venueRouter = express.Router();

// 🟢 Create a new Venue
venueRouter.post("/", venue.createVenue);

// 🟡 Fetch all Venues
venueRouter.get("/", venue.fetchVenues);

// 🔵 Fetch single Venue by ID
venueRouter.get("/:id", venue.fetchVenueById);

// 🟠 Update Venue (any fields)
venueRouter.put("/:id", venue.updateVenue);

// 🔴 Delete Venue
venueRouter.delete("/:id", venue.deleteVenue);

export default venueRouter;
