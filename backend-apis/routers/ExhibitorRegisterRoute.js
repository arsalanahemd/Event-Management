import express from "express";
import * as participation from "../controllers/ExhibitorParticipateController.js";

const participationRouter = express.Router();

/* ===========================
   🎪 PARTICIPATION ROUTES
=========================== */

// 🟢 Register exhibitor for an expo
participationRouter.post("/", participation.registerExhibitor);

// 🟡 Fetch all participation records (Admin)
participationRouter.get("/", participation.fetchAllRegistrations);

// 🔵 Fetch participations by exhibitor ID
participationRouter.get("/by-exhibitor/:exhibitorId", participation.fetchRegistrationsByExhibitor);

// 🔵 Fetch participations by expo ID
participationRouter.get("/by-expo/:expoId", participation.fetchRegistrationsByExpo);

// 🟣 Update participation (Admin assigns floor or status)
participationRouter.put("/:id", participation.updateRegistration);

// 🔴 Delete a participation
participationRouter.delete("/:id", participation.deleteRegistration);

export default participationRouter;
