import express from "express";
import * as expoReg from "../controllers/RegistrationController.js";

const expoRegistrationRouter = express.Router();

// 🟢 Register attendee for an expo
expoRegistrationRouter.post("/", expoReg.registerForExpo);

// 🟡 Fetch all registrations (admin)
expoRegistrationRouter.get("/", expoReg.fetchAllRegistrations);

// 🔵 Fetch registrations by userId
expoRegistrationRouter.get("/user", expoReg.fetchRegistrationsByUser);

// 🟠 Update registration (admin can approve/reject)
expoRegistrationRouter.put("/:id", expoReg.updateRegistration);

// 🔴 Delete registration
expoRegistrationRouter.delete("/:id", expoReg.deleteRegistration);

export default expoRegistrationRouter;
