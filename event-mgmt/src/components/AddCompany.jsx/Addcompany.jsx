// // ─── AddCompany.jsx (main page) ──────────────────────────────
// //
// // Folder structure:
// //   AddCompany/
// //   ├── AddCompany.jsx          ← this file (logic + layout)
// //   ├── styles/
// //   │   ├── tokens.js           ← design tokens
// //   │   └── GlobalStyles.jsx    ← injected <style> tag
// //   └── components/
// //       ├── Brand.jsx           ← top-left logo mark
// //       ├── StepGuide.jsx       ← 3-step how-it-works list
// //       ├── IndustryBadges.jsx  ← industry tag pills
// //       ├── LeftPanel.jsx       ← full left column
// //       ├── Toast.jsx           ← success / error notification
// //       ├── UploadZone.jsx      ← drag-and-drop logo upload
// //       ├── SubmitButton.jsx    ← gold CTA button + spinner
// //       └── CompanyForm.jsx     ← full right-side form card

// import React, { useState }    from "react";
// import { useNavigate }         from "react-router-dom";
// import axios                   from "axios";

// import GlobalStyles            from "./GlobalStyles";
// import LeftPanel               from "./LeftPanel";
// import CompanyForm             from "./CompanyForm";

// const INITIAL_FORM = {
//   companyName:        "",
//   productsOrServices: "",
//   companyEmail:       "",
//   contactNumber:      "",
//   description:        "",
//   image:              null,
// };

// export default function AddCompany() {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [loading,  setLoading]  = useState(false);
//   const [toast,    setToast]    = useState({ msg: "", type: "success" });

//   const navigate = useNavigate();

//   /* ── field handlers ── */
//   const onChange     = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   const onFileChange = (file) => setFormData((p) => ({ ...p, image: file }));
//   const onFileRemove = () => setFormData((p) => ({ ...p, image: null }));

//   /* ── submit ── */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setToast({ msg: "", type: "success" });

//     try {
//       const exhibitor = JSON.parse(localStorage.getItem("user"));
//       if (!exhibitor?._id) {
//         setToast({ msg: "Please login as an exhibitor first!", type: "error" });
//         setLoading(false);
//         return;
//       }

//       const payload = new FormData();
//       Object.keys(formData).forEach((k) => {
//         if (formData[k]) payload.append(k, formData[k]);
//       });
//       payload.append("exhibitorId", exhibitor._id);

//       const res = await axios.post("http://localhost:3001/company", payload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         setToast({ msg: "Company registered successfully!", type: "success" });
//         setFormData(INITIAL_FORM);
//         setTimeout(() => navigate("/showCompany"), 1500);
//       }
//     } catch (err) {
//       setToast({
//         msg: err.response?.data?.message || "Something went wrong. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── render ── */
//   return (
//     <div className="ac-page">
//       <GlobalStyles />

//       {/* Left — branding + step guide */}
//       <LeftPanel />

//       {/* Right — form */}
//       <div className="ac-right">
//         <CompanyForm
//           formData={formData}
//           onChange={onChange}
//           onFileChange={onFileChange}
//           onFileRemove={onFileRemove}
//           onSubmit={handleSubmit}
//           loading={loading}
//           toast={toast}
//           onToastClose={() => setToast((t) => ({ ...t, msg: "" }))}
//         />
//       </div>
//     </div>
//   );
// }