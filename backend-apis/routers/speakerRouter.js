import express from "express";
import * as speaker from "../controllers/SpeakerController.js";
import upload from '../middlewares/multerSetup.js'; // multer config
const speakerRouter = express.Router();

// 🟢 Create new speaker
speakerRouter.post("/",upload.single("image"), speaker.createSpeaker);

// 🟡 Fetch all speakers
speakerRouter.get("/", speaker.fetchSpeakers);

// 🔵 Fetch single speaker by ID
speakerRouter.get("/:id", speaker.fetchSpeakerById);

// 🟠 Update speaker
speakerRouter.put("/:id",upload.single("image"), speaker.updateSpeaker);

// 🔴 Delete speaker
speakerRouter.delete("/:id", speaker.deleteSpeaker);

export default speakerRouter;
