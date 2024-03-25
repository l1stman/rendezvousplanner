import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import auth from "./routes/auth.js";
import profile from "./routes/profile.js";
import plan from "./routes/plan.js"
import account from "./routes/account.js"
// configure necessary modules
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI || "";
        
app.use(cors({
    origin: ["http://localhost:5173", "https://rendezvousplanner.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "SECRET", // Replace with a more secure secret
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Set maxAge to 24 hours in milliseconds
}));
app.use(express.static('public'));

app.use("/auth", auth)
app.use("/profile", profile)
app.use("/plan", plan)
app.use("/account", account)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

// connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error: ' + err);
});

// create a mock routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
