import express from "express";
import {addTask, getTask} from "../controller/task.js"
import {auth} from "../middleware/auth.js"
const router2 = express.Router();

router2.post("/addTask", auth, addTask);
router2.get("/getTask", auth, getTask);
// router2.route("/update").put( auth, updateTask);
// router2.route("/delete").delete(auth, deleteTask);

export default router2;