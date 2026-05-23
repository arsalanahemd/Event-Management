import express from 'express'
import * as dotenv from 'dotenv'
import connectToDB from './config/connectToDb.js';
import contactRouter from './routers/contactRouter.js';
import cors from 'cors'
import authRouter from './routers/authRouter.js';
import floorRouter from './routers/floorRouter.js';
import venueRouter from './routers/venueRouter.js';
import expoRouter from './routers/expoRouter.js';
import registrationRouter from './routers/RegistrationRouter.js';
import companyRouter from './routers/companyRouter.js';
import speakerRouter from './routers/speakerRouter.js';
import participationRouter from "./routers/ExhibitorRegisterRoute.js";
import reportRouter from "./routers/ReportRouter.js";
import ratingRouter from "./routers/ratingRoutes.js";

dotenv.config();


// create express app
const app = express();

// configure express app
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// connect to db
connectToDB();

app.get("/", (req, res) => {
    res.json({ "message": "Welcome to backend" })
})

app.use(authRouter)
app.use("/api/ratings", ratingRouter);
app.use("/contact",contactRouter)
app.use("/floors", floorRouter)
app.use("/venue", venueRouter)
app.use("/expo", expoRouter)
app.use("/register", registrationRouter)
app.use("/company", companyRouter)
app.use("/speaker", speakerRouter)
app.use("/participation", participationRouter);
app.use("/reports", reportRouter);
// Runing server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
