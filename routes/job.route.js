import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").post(isAuthenticated,getJobById);
router.route("/getadminjobs").post(isAuthenticated,getAdminJobs);