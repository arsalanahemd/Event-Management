import express from "express";
import * as contact from "../controllers/ContactController.js";

const contactRouter = express.Router();

//  Create new contact
contactRouter.post("/", contact.createContact);

//  Fetch all contacts
contactRouter.get("/", contact.fetchContacts);

//  Fetch single contact by ID
contactRouter.get("/:id", contact.fetchContactById);

//  Update contact
contactRouter.put("/:id", contact.updateContact);

//  Update contact status only (optional, for admin)
contactRouter.patch("/:id/status", contact.updateContactStatus);

//  Delete contact
contactRouter.delete("/:id", contact.deleteContact);

export default contactRouter;
