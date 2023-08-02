import express from "express";
import bodyParser from "body-parser"
import { connectDb } from "./database/database.js"

import router from "./routes/user.js"
import router2 from "./routes/task.js"
import cookieParser from "cookie-parser";
import cors from 'cors';
import { errorMiddleWare } from "./middleware/error.js";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
   origin: [process.env.FRONTEND_URL],
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true,
}
));


connectDb();

app.use("/api/v1", router)
app.use("/api/v1/task", router2)
app.use(errorMiddleWare);

app.listen(process.env.PORT, (req, res) => {
   console.log(`server connected on Port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});