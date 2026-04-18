// import Company from "../models/CompanyModel.js";

// // 🟢 Create new company (Register company)
// const createCompany = async (req, res) => {
//   try {
//     const { exhibitorId, companyName, productsOrServices, companyEmail, contactNumber, description } = req.body;

//     // ✅ Validation
//     if (
//       !exhibitorId ||
//       !companyName ||
//       !productsOrServices ||
//       !companyEmail ||
//       exhibitorId.trim() === "" ||
//       companyName.trim() === "" ||
//       productsOrServices.trim() === "" ||
//       companyEmail.trim() === ""
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be filled (exhibitorId, companyName, productsOrServices, companyEmail)",
//       });
//     }

//     // ✅ Check if company already exists for this exhibitor
//     const existingCompany = await Company.findOne({ exhibitorId });
//     if (existingCompany) {
//       return res.status(400).json({
//         success: false,
//         message: "Company already registered for this exhibitor",
//       });
//     }

//     // ✅ Create new company
//     const company = await Company.create({
//       exhibitorId,
//       companyName,
//       productsOrServices,
//       companyEmail,
//       contactNumber,
//       description,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Company registered successfully!",
//       company,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // 🟡 Fetch all companies (for admin)
// const fetchCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find()
//       .populate("exhibitorId", "name email role")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, companies });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // 🔵 Fetch company by exhibitorId (for exhibitor dashboard)
// const fetchCompanyByExhibitor = async (req, res) => {
//   try {
//     const exhibitorId = req.params.id; // ✅ now from params instead of query

//     if (!exhibitorId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "exhibitorId is required" });
//     }

//     const company = await Company.findOne({ exhibitorId }).populate(
//       "exhibitorId",
//       "name email role"
//     );

//     if (!company) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No company found for this exhibitor" });
//     }

//     res.status(200).json({ success: true, company });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };


// // 🟠 Update company profile
// const updateCompany = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { companyName, productsOrServices, companyEmail, contactNumber, description } = req.body;

//     const company = await Company.findById(id);
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     company.companyName = companyName || company.companyName;
//     company.productsOrServices = productsOrServices || company.productsOrServices;
//     company.companyEmail = companyEmail || company.companyEmail;
//     company.contactNumber = contactNumber || company.contactNumber;
//     company.description = description || company.description;

//     const updatedCompany = await company.save();

//     res.status(200).json({
//       success: true,
//       message: "Company profile updated successfully",
//       company: updatedCompany,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // 🔴 Delete company (admin or exhibitor)
// const deleteCompany = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const existingCompany = await Company.findById(id);
//     if (!existingCompany) {
//       return res.status(404).json({ success: false, message: "Company does not exist" });
//     }

//     await Company.findByIdAndDelete(id);

//     res.status(200).json({ success: true, message: "Company deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// export {
//   createCompany,
//   fetchCompanies,
//   fetchCompanyByExhibitor,
//   updateCompany,
//   deleteCompany,
// };
import Company from "../models/CompanyModel.js";

// 🟢 Create new company (Register company)
const createCompany = async (req, res) => {
  try {
    const { exhibitorId, companyName, productsOrServices, companyEmail, contactNumber, description } = req.body;
    const image = req.file ? req.file.filename : "";

    // ✅ Validation
    if (!exhibitorId?.trim() || !companyName?.trim() || !productsOrServices?.trim() || !companyEmail?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled (exhibitorId, companyName, productsOrServices, companyEmail)",
      });
    }

    // ✅ Check if company already exists for this exhibitor
    const existingCompany = await Company.findOne({ exhibitorId });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already registered for this exhibitor",
      });
    }

    // ✅ Create new company
    const company = await Company.create({
      exhibitorId,
      companyName,
      productsOrServices,
      companyEmail,
      contactNumber,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Company registered successfully!",
      company,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟡 Fetch all companies (for admin)
const fetchCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("exhibitorId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔵 Fetch company by exhibitorId (for exhibitor dashboard)
const fetchCompanyByExhibitor = async (req, res) => {
  try {
    const { id: exhibitorId } = req.params;

    if (!exhibitorId) {
      return res.status(400).json({ success: false, message: "exhibitorId is required" });
    }

    const company = await Company.findOne({ exhibitorId }).populate(
      "exhibitorId",
      "name email role"
    );

    if (!company) {
      return res.status(404).json({ success: false, message: "No company found for this exhibitor" });
    }

    res.status(200).json({ success: true, company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟠 Update company profile
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, productsOrServices, companyEmail, contactNumber, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Update fields only if provided
    if (companyName?.trim()) company.companyName = companyName;
    if (productsOrServices?.trim()) company.productsOrServices = productsOrServices;
    if (companyEmail?.trim()) company.companyEmail = companyEmail;
    if (contactNumber?.trim()) company.contactNumber = contactNumber;
    if (description?.trim()) company.description = description;
    if (image) company.image = image;

    const updatedCompany = await company.save();

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      company: updatedCompany,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete company (admin or exhibitor)
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company does not exist" });
    }

    await Company.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createCompany,
  fetchCompanies,
  fetchCompanyByExhibitor,
  updateCompany,
  deleteCompany,
};
