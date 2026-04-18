import express from "express";
import * as company from "../controllers/CompanyController.js";
import upload from '../middlewares/multerSetup.js';

const companyRouter = express.Router();

// 🟢 Create new company (Register company)
companyRouter.post("/",upload.single("image"), company.createCompany);

// 🟡 Fetch all companies (for admin)
companyRouter.get("/", company.fetchCompanies);

// 🔵 Fetch company by exhibitorId (for exhibitor dashboard)
companyRouter.get("/by-exhibitor/:id", company.fetchCompanyByExhibitor);
 // ✅ query param version

// 🟠 Update company (update profile)
companyRouter.put("/:id",upload.single("image"), company.updateCompany);

// 🔴 Delete company (admin or exhibitor)
companyRouter.delete("/:id", company.deleteCompany);

export default companyRouter;
