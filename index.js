import express from 'express';
import connectDB from './db/db.js';
import dotenv from "dotenv";
import postRoute from "./routes/postRoute.js";
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
     allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))
// Connect to MongoDB
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1",postRoute);

// Define a simple route
app.get('/', (req, res) => {
  res.json('Hello, MongoDB!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
