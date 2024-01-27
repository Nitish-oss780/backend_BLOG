import express from 'express';
import connectDB from './db/db.js';
import dotenv from "dotenv";
import postRoute from "./routes/postRoute.js";
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL, // specify the allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable credentials (cookies, Authorization headers, etc.)
};

app.use(cors(corsOptions));
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
