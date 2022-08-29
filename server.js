import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";

//db connection and authenticate user
import connectDB from "./db/connect.js";

//import router
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

//middleware
import notFoundmiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authmiddleware from "./middleware/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT_NO || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.status(404).send('welcome')
// })

app.get("/api/v1", (req, res) => {
  res.status(404).json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authmiddleware, jobsRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundmiddleware);

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

start();
