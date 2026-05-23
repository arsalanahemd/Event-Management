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
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const BASE_URL = "http://localhost:3001";

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//     if (!email || !password) {
//       setAlert({ success: false, message: "Please fill all fields." });
//       return;
//     }
//     setLoading(true);

//     if (email === "admin@gmail.com" && password === "admin") {
//       const adminUser = {
//         _id: "admin-001",
//         name: "Default Admin",
//         email,
//         role: "admin",
//       };
//       localStorage.setItem("adminUser", JSON.stringify(adminUser));
//       localStorage.removeItem("user");
//       window.dispatchEvent(new Event("storage"));
//       setAlert({
//         success: true,
//         message: `Admin login successful. Welcome ${adminUser.name}`,
//       });
//       setTimeout(() => {
//         const encodedName = encodeURIComponent(adminUser.name);
//         const encodedId = encodeURIComponent(adminUser._id);
//         window.location.href = `http://localhost:3000/carpatin-dashboard-free?name=${encodedName}&id=${encodedId}`;
//       }, 800);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/login`, formData);
//       const { success, message, user } = res.data;
//       if (!success || !user) {
//         setAlert({ success: false, message: message || "Invalid credentials" });
//         setLoading(false);
//         return;
//       }
//       if (user.role === "admin") {
//         localStorage.setItem("adminUser", JSON.stringify(user));
//         localStorage.removeItem("user");
//         setAlert({
//           success: true,
//           message: `Admin login successful. Welcome ${user.name}`,
//         });
//         setTimeout(() => {
//           const encodedName = encodeURIComponent(user.name);
//           const encodedId = encodeURIComponent(user._id);
//           window.location.href = `http://localhost:3000/?name=${encodedName}&id=${encodedId}`;
//         }, 800);
//       } else {
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.removeItem("adminUser");
//         setAlert({
//           success: true,
//           message: `Login successful. Welcome ${user.name}`,
//         });
//         setTimeout(() => navigate("/"), 800);
//       }
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#F1FAFF",
//       }}
//     >
//       {/* Top Header Section */}
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
//             fontSize: { xs: "2.5rem", md: "4rem" },
//           }}
//         >
//           Welcome Back
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 500, maxWidth: 600, mx: "auto", opacity: 0.9 }}
//         >
//           Login to explore amazing events, exhibitors, and experiences.
//         </Typography>
//       </Box>

//       {/* Main Content Area */}
//       <Box sx={{ flexGrow: 1 }}>
//         <Container maxWidth="xl" sx={{ py: 5 }}>
//           <Grid
//             container
//             spacing={4}
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Grid item xs={12} md={9} lg={9}>
//               <Card
//                 sx={{
//                   borderRadius: 5,
//                   boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
//                   p: { xs: 4, md: 10 },
//                   background: "#fff",
//                   width: "100%",
//                   maxWidth: "100%",
//                   margin: "0 auto",
//                   border: "1px solid rgba(0,0,0,0.05)",
//                 }}
//               >
//                 <Typography
//                   variant="h2"
//                   fontWeight={900}
//                   mb={5}
//                   sx={{
//                     fontFamily: "'Poppins', sans-serif",
//                     background:
//                       "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     textAlign: "center",
//                   }}
//                 >
//                   Login
//                 </Typography>

//                 {alert.message && (
//                   <Box
//                     sx={{
//                       mb: 4,
//                       p: 2.5,
//                       borderRadius: 3,
//                       backgroundColor: alert.success
//                         ? "rgba(76,201,240,0.12)"
//                         : "rgba(255,77,77,0.12)",
//                       color: alert.success ? "#4895EF" : "#F44336",
//                       fontWeight: 700,
//                       textAlign: "center",
//                       border: alert.success
//                         ? "1px solid #4CC9F0"
//                         : "1px solid #F44336",
//                     }}
//                   >
//                     {alert.message}
//                   </Box>
//                 )}

//                 <Stack spacing={4} component="form" onSubmit={handleSubmit}>
//                   <TextField
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     variant="outlined"
//                     sx={{
//                       "& .MuiInputBase-input": { fontSize: "1.2rem", py: 2.5 },
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                           borderColor: "#ddd",
//                           borderRadius: "15px",
//                         },
//                         "&:hover fieldset": { borderColor: "#4895EF" },
//                       },
//                     }}
//                   />

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
//                       "& .MuiInputBase-input": { fontSize: "1.2rem", py: 2.5 },
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                           borderColor: "#ddd",
//                           borderRadius: "15px",
//                         },
//                         "&:hover fieldset": { borderColor: "#4895EF" },
//                       },
//                     }}
//                   />

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       py: 2.5,
//                       fontSize: 20,
//                       fontWeight: 800,
//                       borderRadius: "18px",
//                       background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                       boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
//                       transition: "all 0.4s ease",
//                       textTransform: "none",
//                       "&:hover": {
//                         transform: "translateY(-4px)",
//                         boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
//                         background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//                       },
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? "Verifying..." : "Login to Account"}
//                   </Button>

//                   <Typography textAlign="center" fontSize={18} color="#555">
//                     Don’t have an account?{" "}
//                     <Link
//                       to="/signup"
//                       style={{
//                         color: "#4895EF",
//                         fontWeight: "800",
//                         textDecoration: "none",
//                       }}
//                     >
//                       Sign Up Now
//                     </Link>
//                   </Typography>
//                 </Stack>
//               </Card>
//             </Grid>

//             {/* Side Info Cards */}
//             <Grid item xs={12} md={5} lg={5}>
//               <Stack spacing={3}>
//                 {[
//                   {
//                     title: "Secure Access",
//                     desc: "Your data is protected with high-level encryption and secure protocols.",
//                     color: "#4CC9F0",
//                   },
//                   {
//                     title: "Instant Updates",
//                     desc: "Get real-time event alerts and stay ahead with instant notifications.",
//                     color: "#4895EF",
//                   },
//                   {
//                     title: "Global Network",
//                     desc: "Connect with world-class experts and expand your professional reach.",
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
//                       background: "#1B263B",
//                       color: "#fff",
//                       width: "100%",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "scale(1.02) translateX(10px)",
//                         background: "#273746",
//                         boxShadow: `0 20px 40px ${card.color}40`,
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

//       {/* Bottom CTA Banner (Gap fixed here) */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           color: "white",
//           py: 10,
//           textAlign: "center",
//           mt: 8,
//           mb: 10, // ✅ Gap between Banner and Footer
//           mx: { xs: 2, md: 6 },
//           borderRadius: 8,
//           boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
//         }}
//       >
//         <Container>
//           <Typography
//             variant="h3"
//             fontWeight="900"
//             sx={{
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontFamily: "'Poppins', sans-serif",
//               mb: 2,
//             }}
//           >
//             Stay Connected
//           </Typography>
//           <Typography
//             sx={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 4 }}
//           >
//             Join thousands of users and start your journey today.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// }

// export default Login;
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

/* ── Injected styles ── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{background:${C.bg};font-family:'DM Sans',sans-serif;color:${C.white};min-height:100vh}

    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes toastIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

    .login-page{
      display:grid;
      grid-template-columns:1fr 420px;
      min-height:100vh;
    }

    /* LEFT */
    .lp-left{
      background:${C.bg};
      padding:52px 60px;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      border-right:1px solid ${C.border};
      position:relative;
      overflow:hidden;
    }
    .lp-left::before{
      content:'';position:absolute;top:0;right:0;
      width:220px;height:220px;
      border-left:1px solid rgba(201,168,76,0.07);
      border-bottom:1px solid rgba(201,168,76,0.07);
      border-radius:0 0 0 100%;pointer-events:none;
    }
    .lp-left::after{
      content:'';position:absolute;bottom:0;left:0;
      width:160px;height:160px;
      border-right:1px solid rgba(201,168,76,0.05);
      border-top:1px solid rgba(201,168,76,0.05);
      border-radius:0 100% 0 0;pointer-events:none;
    }

    .brand{display:flex;align-items:center;gap:10px;animation:fadeIn .5s ease}
    .brand-dot{width:8px;height:8px;background:${C.gold};border-radius:50%}
    .brand-name{font-size:12px;letter-spacing:.2em;color:${C.gold};font-weight:600;text-transform:uppercase}

    .hero-section{animation:fadeUp .7s .1s ease both}
    .hero-tag{font-size:10px;letter-spacing:.28em;color:rgba(201,168,76,0.65);text-transform:uppercase;font-weight:600;margin-bottom:20px}
    .hero-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,4vw,58px);line-height:1.05;color:${C.white};font-weight:700;margin-bottom:24px}
    .hero-h1 em{font-style:italic;color:${C.gold}}
    .hero-sub{font-size:13px;color:${C.muted};line-height:1.85;max-width:340px;font-weight:300}

    .stats-row{display:flex;gap:40px;animation:fadeUp .7s .25s ease both}
    .stat-num{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:${C.gold};line-height:1}
    .stat-lbl{font-size:10px;color:rgba(255,255,255,0.3);letter-spacing:.12em;text-transform:uppercase;margin-top:4px}

    .trust-row{display:flex;align-items:center;gap:14px;animation:fadeIn .6s .4s ease both}
    .trust-avatars{display:flex}
    .trust-av{width:28px;height:28px;border-radius:50%;background:rgba(201,168,76,0.2);border:1.5px solid ${C.bg};margin-left:-8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:${C.gold}}
    .trust-av:first-child{margin-left:0}
    .trust-text{font-size:12px;color:${C.muted};font-weight:300}
    .trust-text strong{color:${C.gold};font-weight:600}

    /* RIGHT */
    .lp-right{
      background:${C.surface};
      display:flex;
      align-items:center;
      justify-content:center;
      padding:40px 36px;
    }

    .form-card{
      width:100%;
      background:${C.card};
      border:1px solid ${C.border};
      border-radius:18px;
      padding:36px 32px;
      animation:fadeUp .6s .15s ease both;
    }

    .form-tag{font-size:10px;letter-spacing:.25em;color:${C.gold};text-transform:uppercase;font-weight:600;margin-bottom:10px}
    .form-h{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:${C.white};margin-bottom:4px}
    .form-sub{font-size:12px;color:${C.muted};margin-bottom:28px;font-weight:300;line-height:1.6}

    .f-group{margin-bottom:16px}
    .f-row-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px}
    .f-lbl{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.38);display:block;margin-bottom:7px}
    .f-forgot{font-size:11px;color:rgba(201,168,76,0.7);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
    .f-forgot:hover{color:${C.gold}}

    .f-input-wrap{position:relative}
    .f-input{
      width:100%;
      background:rgba(255,255,255,0.03);
      border:1px solid rgba(255,255,255,0.07);
      border-radius:10px;
      padding:13px 16px;
      color:${C.white};
      font-family:'DM Sans',sans-serif;
      font-size:13px;
      outline:none;
      transition:border-color .2s,background .2s;
    }
    .f-input:focus{border-color:${C.gold};background:rgba(201,168,76,0.05)}
    .f-input::placeholder{color:rgba(255,255,255,0.2)}
    .f-input.with-icon{padding-right:44px}

    .eye-btn{
      position:absolute;right:14px;top:50%;transform:translateY(-50%);
      background:none;border:none;color:${C.muted};cursor:pointer;
      display:flex;align-items:center;padding:0;
      transition:color .2s;
    }
    .eye-btn:hover{color:${C.gold}}

    .btn-submit{
      width:100%;padding:14px;
      background:${C.gold};
      border:none;border-radius:10px;
      color:#0a0a0a;
      font-family:'DM Sans',sans-serif;
      font-size:13px;font-weight:600;
      letter-spacing:.08em;text-transform:uppercase;
      cursor:pointer;
      transition:background .2s,transform .15s;
      margin-top:8px;
      display:flex;align-items:center;justify-content:center;gap:8px;
    }
    .btn-submit:hover{background:${C.goldHover};transform:translateY(-1px)}
    .btn-submit:active{transform:scale(.99)}
    .btn-submit:disabled{opacity:.5;cursor:not-allowed;transform:none}

    .spinner{
      width:14px;height:14px;
      border:2px solid rgba(10,10,10,0.3);
      border-top-color:#0a0a0a;
      border-radius:50%;
      animation:spin .7s linear infinite;
    }

    .divider{display:flex;align-items:center;gap:12px;margin:20px 0}
    .div-line{flex:1;height:1px;background:rgba(255,255,255,0.06)}
    .div-txt{font-size:11px;color:rgba(255,255,255,0.22);white-space:nowrap}

    .bottom-link{text-align:center;font-size:12px;color:${C.muted};margin-top:16px}
    .bottom-link a{color:${C.gold};font-weight:600;text-decoration:none}
    .bottom-link a:hover{color:${C.goldHover}}

    .toast{
      border-radius:10px;padding:12px 16px;
      margin-bottom:20px;
      display:flex;align-items:center;gap:10px;
      font-size:13px;animation:toastIn .3s ease;
    }
    .toast.success{background:rgba(20,45,20,0.9);border:1px solid rgba(74,222,128,0.3);color:#86efac}
    .toast.error{background:rgba(45,15,15,0.9);border:1px solid rgba(248,113,113,0.3);color:#fca5a5}
    .toast-icon{font-size:14px}
    .toast-close{margin-left:auto;background:none;border:none;color:inherit;cursor:pointer;opacity:.6;font-size:14px;padding:0}

    @media(max-width:768px){
      .login-page{grid-template-columns:1fr}
      .lp-left{display:none}
    }
  `}</style>
);

/* ── Toast ── */
function Toast({ alert, onClose }) {
  if (!alert.message) return null;
  return (
    <div className={`toast ${alert.success ? "success" : "error"}`}>
      <span className="toast-icon">{alert.success ? "✓" : "✕"}</span>
      <span style={{ flex: 1 }}>{alert.message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
}

/* ── Eye toggle input ── */
function PasswordField({ value, onChange, placeholder = "••••••••" }) {
  const [show, setShow] = useState(false);
  return (
    <div className="f-input-wrap">
      <input
        className="f-input with-icon"
        type={show ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      <button type="button" className="eye-btn" onClick={() => setShow(s => !s)} aria-label="Toggle password">
        {show
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        }
      </button>
    </div>
  );
}

/* ── Left panel ── */
function LeftPanel() {
  return (
    <div className="lp-left">
      <div className="brand">
        <div className="brand-dot" />
        <span className="brand-name">EventSphere</span>
      </div>

      <div className="hero-section">
        <p className="hero-tag">// The Premier Event Platform</p>
        <h1 className="hero-h1">
          Where every<br />event becomes<br /><em>legendary.</em>
        </h1>
        <p className="hero-sub">
          Join 50,000+ professionals who discover, exhibit, and connect through EventSphere's global exhibition network.
        </p>
      </div>

      <div>
        <div className="stats-row" style={{ marginBottom: 32 }}>
          {[["50K+", "Attendees"], ["200+", "Events"], ["80+", "Exhibitors"]].map(([n, l]) => (
            <div key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-lbl">{l}</div>
            </div>
          ))}
        </div>

        <div className="trust-row">
          <div className="trust-avatars">
            {["JD", "SR", "AK", "MP"].map(i => <div key={i} className="trust-av">{i}</div>)}
          </div>
          <p className="trust-text">Trusted by <strong>50,000+</strong> professionals worldwide</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Login ── */
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  const onChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setAlert({ success: false, message: "Please fill all fields." });
      return;
    }
    setLoading(true);

    /* hardcoded admin shortcut */
    if (formData.email === "admin@gmail.com" && formData.password === "admin") {
      const adminUser = { _id: "admin-001", name: "Default Admin", email: formData.email, role: "admin" };
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("storage"));
      setAlert({ success: true, message: `Welcome back, ${adminUser.name}!` });
      setTimeout(() => {
        window.location.href = `http://localhost:3000/carpatin-dashboard-free?name=${encodeURIComponent(adminUser.name)}&id=${encodeURIComponent(adminUser._id)}`;
      }, 800);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, formData);
      const { success, message, user } = res.data;
      if (!success || !user) {
        setAlert({ success: false, message: message || "Invalid credentials." });
        setLoading(false);
        return;
      }
      if (user.role === "admin") {
        localStorage.setItem("adminUser", JSON.stringify(user));
        localStorage.removeItem("user");
        setAlert({ success: true, message: `Welcome back, ${user.name}!` });
        setTimeout(() => {
          window.location.href = `http://localhost:3000/?name=${encodeURIComponent(user.name)}&id=${encodeURIComponent(user._id)}`;
        }, 800);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("adminUser");
        setAlert({ success: true, message: `Welcome back, ${user.name}!` });
        setTimeout(() => navigate("/"), 800);
      }
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      setAlert({ success: false, message: err.response?.data?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Styles />
      <LeftPanel />
      <div className="lp-right">
        <div className="form-card">
          <p className="form-tag">// Welcome back</p>
          <h2 className="form-h">Sign in</h2>
          <p className="form-sub">Access your events, registrations &amp; network</p>

          <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

          <form onSubmit={handleSubmit}>
            <div className="f-group">
              <label className="f-lbl">Email address</label>
              <input className="f-input" type="email" name="email" value={formData.email} onChange={onChange} placeholder="you@example.com" required />
            </div>

            <div className="f-group">
              <div className="f-row-label">
                <label className="f-lbl" style={{ margin: 0 }}>Password</label>
                <button type="button" className="f-forgot">Forgot password?</button>
              </div>
              <PasswordField value={formData.password} onChange={onChange} />
            </div>

            <button className="btn-submit" type="submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? "Verifying…" : "Login to Account"}
            </button>
          </form>

          <div className="divider">
            <div className="div-line" />
            <span className="div-txt">new to eventsphere?</span>
            <div className="div-line" />
          </div>

          <p className="bottom-link">
            <Link to="/signup">Create a free account →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}