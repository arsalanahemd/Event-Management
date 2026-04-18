import express from 'express';
import * as expoController from '../controllers/expoController.js';
import upload from '../middlewares/multerSetup.js'; // multer config

const expoRouter = express.Router();

// ========== CREATE EXPO ==========
expoRouter.post("/create", upload.single("image"), expoController.createExpo);

// ========== FETCH ALL EXPOS ==========
expoRouter.get("/", expoController.fetchExpos);

// ========== FETCH SINGLE EXPO ==========
expoRouter.get("/:id", expoController.fetchExpoById);

// ========== UPDATE EXPO ==========
expoRouter.put("/update/:id", upload.single("image"), expoController.updateExpo);

// ========== DELETE EXPO ==========
expoRouter.delete("/delete/:id", expoController.deleteExpo);

export default expoRouter;
