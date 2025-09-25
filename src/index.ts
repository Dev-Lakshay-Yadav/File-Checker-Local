import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // if using Node < 18
import { splitCasesByLabToken } from "./checkerUtils/mainChecker.js";
import { handleApiError } from "./utils/errorHandlers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// local test
app.get("/cases/status", async (req, res) => {
  try {
    const casesStatus = await splitCasesByLabToken();
    res.json(casesStatus);
  } catch (error) {
    handleApiError(res, error, "checkCases");
  }
});

// ------------------- Push Data Every 1 Minute -------------------
// const PUSH_INTERVAL = 10 * 1000; // 1 minute

// const pushCasesStatus = async () => {
//   try {
//     const casesStatus = await splitCasesByLabToken();
//     // const response = await fetch("https://file-checker-server.onrender.com/", {

//     if (!process.env.Live_Server) {
//       throw new Error("Live_Server environment variable is not defined");
//     }
//     const response = await fetch(process.env.Live_Server, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(casesStatus),
//     });

//     if (!response.ok) {
//       console.error("❌ Failed to push data:", response.statusText);
//     } else {
//       console.log("✅ Cases status sent to Server B");
//     }
//   } catch (error) {
//     console.error("❌ Error pushing cases status:", error);
//   }
// };

// Start interval
// setInterval(pushCasesStatus, PUSH_INTERVAL);

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  // pushCasesStatus();
});
