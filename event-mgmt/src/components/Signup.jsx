// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Container,
//   MenuItem,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const BASE_URL = "http://localhost:3001";

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const validateForm = () => {
//     const { name, email, password, role } = formData;

//     if (name.trim().length < 3) {
//       setAlert({
//         success: false,
//         message: "Name must be at least 3 characters long",
//       });
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setAlert({
//         success: false,
//         message: "Please enter a valid email address",
//       });
//       return false;
//     }

//     if (password.length < 6) {
//       setAlert({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//       return false;
//     }

//     if (!role) {
//       setAlert({ success: false, message: "Please select a role" });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, role } = formData;

//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const res = await axios.post(`${BASE_URL}/signup`, formData);
//       if (res.data.success) {
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         window.dispatchEvent(new Event("storage"));
//         setAlert({ success: true, message: "Signup Successful" });
//         setFormData({ name: "", email: "", password: "", role: "" });
//         setTimeout(() => navigate("/"), 800);
//       } else {
//         setAlert({ success: false, message: res.data.message });
//       }
//     } catch (error) {
//       console.error(error);
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         // Fix: Full height background ensure karne ke liye flex use kiya
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         width: "100%",
//         backgroundColor: "#F1FAFF",
//         overflowX: "hidden",
//       }}
//     >
//       {/* Top Banner */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           py: { xs: 6, md: 10 },
//           textAlign: "center",
//           color: "white",
//           mb: 6,
//           boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//         }}
//       >
//         <Typography
//           variant="h3"
//           fontWeight={900}
//           sx={{
//             mb: 2,
//             fontFamily: "'Poppins', sans-serif",
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Join Us Today
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 500, maxWidth: 600, mx: "auto" }}
//         >
//           Create your account to explore amazing events, exhibitors, and
//           experiences.
//         </Typography>
//       </Box>

//       {/* Main Content Area */}
//       <Box sx={{ flex: 1 }}>
//         <Container maxWidth="xl" sx={{ py: 5 }}>
//           <Grid
//             container
//             spacing={4}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Grid item xs={12} md={8} lg={8}>
//               <Card
//                 sx={{
//                   borderRadius: 4,
//                   boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
//                   p: { xs: 4, md: 8 },
//                   background: "#fff",
//                   width: "100%",
//                   maxWidth: "100%",
//                   margin: "0 auto",
//                 }}
//               >
//                 <Typography
//                   variant="h3"
//                   fontWeight={800}
//                   mb={4}
//                   sx={{
//                     fontFamily: "'Poppins', sans-serif",
//                     background:
//                       "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     textAlign: "center",
//                   }}
//                 >
//                   Signup
//                 </Typography>

//                 {alert.message && (
//                   <Box
//                     sx={{
//                       mb: 4,
//                       p: 2.5,
//                       borderRadius: 2,
//                       backgroundColor: alert.success
//                         ? "rgba(76,201,240,0.15)"
//                         : "rgba(255,77,77,0.15)",
//                       color: alert.success ? "#4CC9F0" : "#F44336",
//                       fontWeight: 600,
//                       textAlign: "center",
//                     }}
//                   >
//                     {alert.message}
//                   </Box>
//                 )}

//                 <Stack spacing={3} component="form" onSubmit={handleSubmit}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Full Name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: "12px",
//                             "& fieldset": { borderColor: "#ddd" },
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         label="Email Address"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         fullWidth
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: "12px",
//                             "& fieldset": { borderColor: "#ddd" },
//                           },
//                         }}
//                       />
//                     </Grid>
//                   </Grid>

//                   <TextField
//                     label="Password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={handleClickShowPassword}
//                             edge="end"
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "12px",
//                         "& fieldset": { borderColor: "#ddd" },
//                       },
//                     }}
//                   />

//                   <TextField
//                     select
//                     label="Join As"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "12px",
//                         "& fieldset": { borderColor: "#ddd" },
//                       },
//                     }}
//                   >
//                     <MenuItem value="attendee">Attendee (Visitor)</MenuItem>
//                     <MenuItem value="exhibitor">Exhibitor (Organizer)</MenuItem>
//                   </TextField>

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       py: 2,
//                       fontSize: 18,
//                       fontWeight: 700,
//                       borderRadius: "15px",
//                       background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                       boxShadow: "0 10px 30px rgba(72, 149, 239, 0.4)",
//                       transition: "all 0.4s ease",
//                       "&:hover": {
//                         transform: "translateY(-3px)",
//                         boxShadow: "0 15px 40px rgba(72, 149, 239, 0.6)",
//                         background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//                       },
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? "Creating Account..." : "Signup Now"}
//                   </Button>

//                   <Typography textAlign="center" fontSize={16} color="#666">
//                     Already have an account?{" "}
//                     <Link
//                       to="/login"
//                       style={{
//                         color: "#4895EF",
//                         fontWeight: 700,
//                         textDecoration: "none",
//                       }}
//                     >
//                       Login
//                     </Link>
//                   </Typography>
//                 </Stack>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={4} lg={4}>
//               <Stack spacing={3}>
//                 {[
//                   {
//                     title: "Fast Event Booking",
//                     desc: "Book and manage your events efficiently with our lightning-fast booking system.",
//                     color: "#4CC9F0",
//                   },
//                   {
//                     title: "Connect with Exhibitors",
//                     desc: "Discover and network with top exhibitors globally to grow your professional reach.",
//                     color: "#4895EF",
//                   },
//                   {
//                     title: "24/7 Support",
//                     desc: "Our dedicated team is always here to assist you with any queries or issues.",
//                     color: "#F72585",
//                   },
//                 ].map((card, index) => (
//                   <Card
//                     key={index}
//                     sx={{
//                       borderRadius: 4,
//                       p: 4,
//                       boxShadow: `0 15px 35px ${card.color}25`,
//                       borderLeft: `10px solid ${card.color}`,
//                       background: "linear-gradient(135deg, #1B263B, #273746)",
//                       color: "#E0E1DD",
//                       transition: "all 0.4s ease",
//                       "&:hover": {
//                         transform: "scale(1.03) translateX(10px)",
//                         boxShadow: `0 20px 45px ${card.color}40`,
//                         filter: "brightness(1.2)",
//                       },
//                     }}
//                   >
//                     <Typography
//                       variant="h5"
//                       fontWeight={800}
//                       sx={{
//                         mb: 1.5,
//                         color: card.color,
//                         letterSpacing: "0.5px",
//                       }}
//                     >
//                       {card.title}
//                     </Typography>
//                     <Typography
//                       variant="body1"
//                       sx={{ opacity: 0.85, lineHeight: 1.6 }}
//                     >
//                       {card.desc}
//                     </Typography>
//                   </Card>
//                 ))}
//               </Stack>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Bottom CTA Banner (Footer) */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           color: "white",
//           py: 10,
//           textAlign: "center",
//           mt: "auto",
//           mx: { xs: 0, md: 6 },
//           mb: { xs: 0, md: 6 },
//           borderRadius: { xs: 0, md: 5 },
//           boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
//           position: "relative",
//           overflow: "hidden",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <Container>
//           <Typography
//             variant="h4"
//             fontWeight="900"
//             sx={{
//               textTransform: "uppercase",
//               letterSpacing: "2px",
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontFamily: "'Poppins', sans-serif",
//               fontSize: { xs: "1.8rem", md: "2.8rem" },
//               mb: 1,
//             }}
//           >
//             Start Your Journey
//           </Typography>
//           <Typography
//             sx={{
//               color: "rgba(255,255,255,0.6)",
//               fontSize: { xs: "0.95rem", md: "1.1rem" },
//               fontFamily: "'Poppins', sans-serif",
//               fontWeight: 500,
//               mb: 4,
//               letterSpacing: "1px",
//             }}
//           >
//             Sign up now and access events, exhibitors, and experiences
//             instantly.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// }

// export default Signup;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* ── Tokens ── */
const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  card: "#161616",
  gold: "#c9a84c",
  goldHover: "#d4b25e",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.38)",
  faint: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.07)",
  goldBorder: "rgba(201,168,76,0.22)",
};

/* ── Styles ── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{background:${C.bg};font-family:'DM Sans',sans-serif;color:${C.white};min-height:100vh}

    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes toastIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

    .signup-page{display:grid;grid-template-columns:420px 1fr;min-height:100vh}

    /* LEFT form side */
    .sp-left{
      background:${C.surface};
      display:flex;align-items:center;justify-content:center;
      padding:40px 36px;
      border-right:1px solid ${C.border};
    }

    .form-card{
      width:100%;
      background:${C.card};
      border:1px solid ${C.border};
      border-radius:18px;
      padding:36px 32px;
      animation:fadeUp .6s .1s ease both;
    }

    .form-tag{font-size:10px;letter-spacing:.25em;color:${C.gold};text-transform:uppercase;font-weight:600;margin-bottom:10px}
    .form-h{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:${C.white};margin-bottom:4px}
    .form-sub{font-size:12px;color:${C.muted};margin-bottom:24px;font-weight:300;line-height:1.6}

    .f-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
    .f-group{margin-bottom:14px}
    .f-lbl{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.38);display:block;margin-bottom:6px}

    .f-input-wrap{position:relative}
    .f-input{
      width:100%;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;
      padding:12px 14px;
      color:${C.white};
      font-family:'DM Sans',sans-serif;
      font-size:13px;
      outline:none;
      transition:border-color .2s,background .2s;
    }
    .f-input:focus{border-color:${C.gold};background:rgba(201,168,76,0.05)}
    .f-input::placeholder{color:rgba(255,255,255,0.2)}
    .f-input.with-icon{padding-right:44px}
    .f-select{appearance:none;cursor:pointer}

    .eye-btn{
      position:absolute;right:12px;top:50%;transform:translateY(-50%);
      background:none;border:none;color:${C.muted};cursor:pointer;
      display:flex;align-items:center;padding:0;transition:color .2s;
    }
    .eye-btn:hover{color:${C.gold}}

    /* role cards */
    .role-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
    .role-card{
      border:1px solid rgba(255,255,255,0.07);
      border-radius:12px;padding:16px 14px;
      cursor:pointer;
      transition:border-color .2s,background .2s;
      background:rgba(255,255,255,0.02);
      text-align:center;
    }
    .role-card:hover{border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.04)}
    .role-card.selected{border-color:${C.gold};background:rgba(201,168,76,0.09)}
    .role-icon{font-size:22px;margin-bottom:8px}
    .role-title{font-size:13px;font-weight:600;color:${C.white};margin-bottom:2px}
    .role-card.selected .role-title{color:${C.gold}}
    .role-sub{font-size:10px;color:${C.muted};letter-spacing:.04em}

    .btn-submit{
      width:100%;padding:14px;
      background:${C.gold};border:none;border-radius:10px;
      color:#0a0a0a;
      font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;
      letter-spacing:.08em;text-transform:uppercase;
      cursor:pointer;
      transition:background .2s,transform .15s;
      margin-top:4px;
      display:flex;align-items:center;justify-content:center;gap:8px;
    }
    .btn-submit:hover{background:${C.goldHover};transform:translateY(-1px)}
    .btn-submit:active{transform:scale(.99)}
    .btn-submit:disabled{opacity:.5;cursor:not-allowed;transform:none}

    .spinner{width:14px;height:14px;border:2px solid rgba(10,10,10,0.3);border-top-color:#0a0a0a;border-radius:50%;animation:spin .7s linear infinite}

    .divider{display:flex;align-items:center;gap:12px;margin:18px 0}
    .div-line{flex:1;height:1px;background:rgba(255,255,255,0.06)}
    .div-txt{font-size:11px;color:rgba(255,255,255,0.22);white-space:nowrap}

    .bottom-link{text-align:center;font-size:12px;color:${C.muted};margin-top:12px}
    .bottom-link a{color:${C.gold};font-weight:600;text-decoration:none}
    .bottom-link a:hover{color:${C.goldHover}}

    .toast{border-radius:10px;padding:12px 16px;margin-bottom:18px;display:flex;align-items:center;gap:10px;font-size:13px;animation:toastIn .3s ease}
    .toast.success{background:rgba(20,45,20,0.9);border:1px solid rgba(74,222,128,0.3);color:#86efac}
    .toast.error{background:rgba(45,15,15,0.9);border:1px solid rgba(248,113,113,0.3);color:#fca5a5}
    .toast-close{margin-left:auto;background:none;border:none;color:inherit;cursor:pointer;opacity:.6;font-size:14px;padding:0}

    /* RIGHT panel */
    .sp-right{
      background:${C.bg};
      padding:52px 60px;
      display:flex;flex-direction:column;justify-content:space-between;
      position:relative;overflow:hidden;
    }
    .sp-right::before{
      content:'';position:absolute;top:0;left:0;
      width:200px;height:200px;
      border-right:1px solid rgba(201,168,76,0.06);
      border-bottom:1px solid rgba(201,168,76,0.06);
      border-radius:0 0 100% 0;pointer-events:none;
    }

    .brand{display:flex;align-items:center;gap:10px;animation:fadeIn .5s ease}
    .brand-dot{width:8px;height:8px;background:${C.gold};border-radius:50%}
    .brand-name{font-size:12px;letter-spacing:.2em;color:${C.gold};font-weight:600;text-transform:uppercase}

    .right-hero{animation:fadeUp .7s .1s ease both}
    .right-tag{font-size:10px;letter-spacing:.28em;color:rgba(201,168,76,0.65);text-transform:uppercase;font-weight:600;margin-bottom:20px}
    .right-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,3.5vw,54px);line-height:1.06;color:${C.white};font-weight:700;margin-bottom:22px}
    .right-h1 em{font-style:italic;color:${C.gold}}
    .right-sub{font-size:13px;color:${C.muted};line-height:1.85;max-width:340px;font-weight:300;margin-bottom:40px}

    .benefits-list{display:flex;flex-direction:column;gap:16px;animation:fadeUp .7s .2s ease both}
    .benefit-item{display:flex;align-items:flex-start;gap:14px}
    .b-icon-wrap{
      width:36px;height:36px;border-radius:10px;
      background:rgba(201,168,76,0.1);
      border:1px solid rgba(201,168,76,0.2);
      display:flex;align-items:center;justify-content:center;
      flex-shrink:0;font-size:15px;
    }
    .b-title{font-size:13px;font-weight:600;color:${C.white};margin-bottom:2px}
    .b-desc{font-size:12px;color:${C.muted};line-height:1.6;font-weight:300}

    .stats-row{display:flex;gap:32px;animation:fadeUp .7s .3s ease both}
    .stat-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:${C.gold};line-height:1}
    .stat-lbl{font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:.12em;text-transform:uppercase;margin-top:3px}

    @media(max-width:900px){
      .signup-page{grid-template-columns:1fr}
      .sp-right{display:none}
    }
  `}</style>
);

/* ── Toast ── */
function Toast({ alert, onClose }) {
  if (!alert.message) return null;
  return (
    <div className={`toast ${alert.success ? "success" : "error"}`}>
      <span>{alert.success ? "✓" : "✕"}</span>
      <span style={{ flex: 1 }}>{alert.message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}

/* ── Password field ── */
function PasswordField({ value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="f-input-wrap">
      <input className="f-input with-icon" type={show ? "text" : "password"} name="password" value={value} onChange={onChange} placeholder="Min. 6 characters" required />
      <button type="button" className="eye-btn" onClick={() => setShow(s => !s)} aria-label="Toggle password">
        {show
          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      </button>
    </div>
  );
}

/* ── Role Selector ── */
function RoleSelector({ value, onChange }) {
  const roles = [
    { val: "attendee", icon: "🎟", title: "Attendee", sub: "Visitor / Explorer" },
    { val: "exhibitor", icon: "🏢", title: "Exhibitor", sub: "Brand / Organizer" },
  ];
  return (
    <div>
      <label className="f-lbl">Join as</label>
      <div className="role-grid">
        {roles.map(r => (
          <div
            key={r.val}
            className={`role-card${value === r.val ? " selected" : ""}`}
            onClick={() => onChange({ target: { name: "role", value: r.val } })}
          >
            <div className="role-icon">{r.icon}</div>
            <div className="role-title">{r.title}</div>
            <div className="role-sub">{r.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Right panel ── */
function RightPanel() {
  const benefits = [
    { icon: "🚀", title: "Fast Event Booking", desc: "Book and manage events efficiently with our lightning-fast booking system." },
    { icon: "🤝", title: "Global Network", desc: "Connect with top exhibitors and professionals across the world." },
    { icon: "💬", title: "24/7 Support", desc: "Our dedicated team is always ready to assist you anytime." },
  ];
  return (
    <div className="sp-right">
      <div className="brand">
        <div className="brand-dot" />
        <span className="brand-name">EventSphere</span>
      </div>

      <div className="right-hero">
        <p className="right-tag">// Start Your Journey</p>
        <h2 className="right-h1">
          Everything you need,<br />all in <em>one place.</em>
        </h2>
        <p className="right-sub">
          Join a global community of innovators, creators, and professionals building the future of live events.
        </p>

        <div className="benefits-list">
          {benefits.map(b => (
            <div key={b.title} className="benefit-item">
              <div className="b-icon-wrap">{b.icon}</div>
              <div>
                <div className="b-title">{b.title}</div>
                <div className="b-desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-row">
        {[["50K+", "Attendees"], ["200+", "Events"], ["99%", "Satisfaction"]].map(([n, l]) => (
          <div key={l}>
            <div className="stat-num">{n}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Signup ── */
export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  const onChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    const { name, email, password, role } = formData;
    if (name.trim().length < 3) { setAlert({ success: false, message: "Name must be at least 3 characters." }); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setAlert({ success: false, message: "Please enter a valid email address." }); return false; }
    if (password.length < 6) { setAlert({ success: false, message: "Password must be at least 6 characters." }); return false; }
    if (!role) { setAlert({ success: false, message: "Please select your role." }); return false; }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData);
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("storage"));
        setAlert({ success: true, message: "Account created! Welcome aboard 🎉" });
        setFormData({ name: "", email: "", password: "", role: "" });
        setTimeout(() => navigate("/"), 800);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (err) {
      setAlert({ success: false, message: err.response?.data?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Styles />
      <div className="sp-left">
        <div className="form-card">
          <p className="form-tag">// Create account</p>
          <h2 className="form-h">Join EventSphere</h2>
          <p className="form-sub">Sign up and unlock your world of events</p>

          <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

          <form onSubmit={handleSubmit}>
            <div className="f-grid">
              <div>
                <label className="f-lbl">Full name</label>
                <input className="f-input" type="text" name="name" value={formData.name} onChange={onChange} placeholder="John Doe" required />
              </div>
              <div>
                <label className="f-lbl">Email address</label>
                <input className="f-input" type="email" name="email" value={formData.email} onChange={onChange} placeholder="you@example.com" required />
              </div>
            </div>

            <div className="f-group">
              <label className="f-lbl">Password</label>
              <PasswordField value={formData.password} onChange={onChange} />
            </div>

            <RoleSelector value={formData.role} onChange={onChange} />

            <button className="btn-submit" type="submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? "Creating account…" : "Create My Account"}
            </button>
          </form>

          <div className="divider">
            <div className="div-line" />
            <span className="div-txt">already have an account?</span>
            <div className="div-line" />
          </div>

          <p className="bottom-link">
            <Link to="/login">Sign in instead →</Link>
          </p>
        </div>
      </div>
      <RightPanel />
    </div>
  );
}