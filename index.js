import Express from "express";
import dotenv from "dotenv";
import initCron from "./app.js";
import cronJobInit from "./worker/index.js";

dotenv.config();
const app = Express();
const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
