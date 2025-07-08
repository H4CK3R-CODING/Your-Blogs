
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import slugify from 'slugify';
import mainRouter from './routers/mainRouter.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;


app.use("/api", mainRouter);

connectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));