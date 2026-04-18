import Floor from "../models/FloorModel.js";

// 🟢 Create new Floor
const createFloor = async (req, res) => {
  try {
    const { floor, boothName, boothSize } = req.body;

    // ✅ Validation
    if (!floor || !boothName || !boothSize) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (floor, boothName, boothSize)",
      });
    }

    // ✅ Prevent duplicates only for boothName (case-insensitive)
    const existingBooth = await Floor.findOne({
      boothName: { $regex: `^${boothName.trim()}$`, $options: "i" },
    });

    if (existingBooth) {
      return res.status(400).json({
        success: false,
        message: "This booth name already exists",
      });
    }

    // ✅ Create Floor (floor can be same)
    const newFloor = await Floor.create({
      floor: floor.trim(),
      boothName: boothName.trim(),
      boothSize: boothSize.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Floor created successfully",
      floor: newFloor,
    });
  } catch (err) {
    console.error("Error creating floor:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🟡 Fetch all Floors
const fetchFloors = async (req, res) => {
  try {
    const floors = await Floor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, floors });
  } catch (err) {
    console.error("Error fetching floors:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔵 Fetch single Floor by ID
const fetchFloorById = async (req, res) => {
  try {
    const { id } = req.params;
    const floor = await Floor.findById(id);

    if (!floor) {
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    res.status(200).json({ success: true, floor });
  } catch (err) {
    console.error("Error fetching floor by ID:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟠 Update Floor (any field)
const updateFloor = async (req, res) => {
  try {
    const { id } = req.params;
    const { floor, boothName, boothSize } = req.body;

    const existing = await Floor.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    // ✅ Check boothName uniqueness on update (ignore current record, case-insensitive)
    if (boothName && boothName.trim().toLowerCase() !== existing.boothName.toLowerCase()) {
      const boothExists = await Floor.findOne({
        boothName: { $regex: `^${boothName.trim()}$`, $options: "i" },
        _id: { $ne: id },
      });

      if (boothExists) {
        return res.status(400).json({
          success: false,
          message: "This booth name already exists",
        });
      }
    }

    existing.floor = floor?.trim() || existing.floor;
    existing.boothName = boothName?.trim() || existing.boothName;
    existing.boothSize = boothSize?.trim() || existing.boothSize;

    const updatedFloor = await existing.save();

    res.status(200).json({
      success: true,
      message: "Floor updated successfully",
      floor: updatedFloor,
    });
  } catch (err) {
    console.error("Error updating floor:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete Floor
const deleteFloor = async (req, res) => {
  try {
    const { id } = req.params;

    const floor = await Floor.findById(id);
    if (!floor) {
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    await Floor.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Floor deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting floor:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createFloor, fetchFloors, fetchFloorById, updateFloor, deleteFloor };
