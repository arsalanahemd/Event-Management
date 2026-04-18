import express from "express";
import * as floor from "../controllers/floorController.js";

const floorRouter = express.Router();

// 🟢 Create a new Floor
floorRouter.post("/", floor.createFloor);

// 🟡 Fetch all Floors
floorRouter.get("/", floor.fetchFloors);

// 🔵 Fetch single Floor by ID
floorRouter.get("/:id", floor.fetchFloorById);

// 🟠 Update Floor (any fields)
floorRouter.put("/:id", floor.updateFloor);

// 🔴 Delete Floor
floorRouter.delete("/:id", floor.deleteFloor);

export default floorRouter;
