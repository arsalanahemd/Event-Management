import Contact from "../models/ContactModel.js";

// 🟢 Create new contact
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message, userId } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !subject ||
      !message ||
      !userId ||
      fullName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      subject.trim() === "" ||
      message.trim() === "" ||
      userId.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (including userId)",
      });
    }

    const contact = await Contact.create({
      userId,
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      contact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🟡 Fetch all contacts
const fetchContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("userId", "name email role")
      .sort({ sendAt: -1 });

    res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔵 Fetch contact by ID
const fetchContactById = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const contacts = await Contact.find({ userId })
      .populate("userId", "name email role")
      .sort({ sendAt: -1 });

    res.status(200).json({ success: true, contacts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// 🟠 Update contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, subject, message, status } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    contact.fullName = fullName || contact.fullName;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.subject = subject || contact.subject;
    contact.message = message || contact.message;

    // ✅ new addition: update status if provided
    if (status) {
      contact.status = status;
    }

    const updatedContact = await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔴 Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const existContact = await Contact.findById(id);
    if (!existContact) {
      return res.status(404).json({ success: false, message: "Contact does not exist" });
    }

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🟣 Update contact status only (quick route for admin)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: `Message marked as ${status}`,
      contact: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  createContact,
  fetchContacts,
  fetchContactById,
  updateContact,
  deleteContact,
  updateContactStatus,
};
