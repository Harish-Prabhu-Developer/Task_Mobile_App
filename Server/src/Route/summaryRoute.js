import express from 'express';
import  {getReportSummary, getSummaryData}  from '../Controller/SummaryController.js';
import { authenticateUser } from '../Middelware/authMiddleware.js';

const summaryRouter = express.Router();

summaryRouter.get("/summary", authenticateUser, getSummaryData);
summaryRouter.get("/report",authenticateUser, getReportSummary);
export default summaryRouter;