
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routers/mainRouter.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: [`${process.env.FRONT_URL}`],
    // origin: `*`,
    credentials: true
}))

app.use(express.json());
const PORT = process.env.PORT || 5000;


const PING_INTERVAL = 14 * 60 * 1000; // 5 minutes in ms
const SELF_PING_URL = process.env.SELF_URL || `http://localhost:${PORT}/`;

let timer = null;

// Function to ping self
async function pingSelf() {
  try {
    const res = await fetch(SELF_PING_URL);
    // console.log(`[${new Date().toISOString()}] Self-ping successful: ${res.status}`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Self-ping failed: ${err.message}`);
  } finally {
    // After ping, start timer again for next 5 minutes of inactivity
    startTimer();
  }
}

// Start or reset the timer
function startTimer() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    // console.log(`[${new Date().toISOString()}] No requests for 5 minutes — pinging self.`);
    pingSelf();
  }, PING_INTERVAL);
//   console.log(`[${new Date().toISOString()}] Timer started/reset.`);
}

// Middleware to reset timer on every request
app.use((req, res, next) => {
  startTimer();
  next();
});


app.use("/api", mainRouter);

app.get("/",(req,res)=>{
    console.log("ping-backend : " + new Date().toLocaleString());
    res.send({
        msg: "Hello"
    })
})

app.listen(PORT,async ()=>{
    await connectToDB();
    console.log(`The Server is running on port ${PORT}`);
    startTimer(); // start timer when server starts
})