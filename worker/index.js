import cron from "node-cron";
import CoinCache from "./tasks/CoinCache.js";
import cronJob from "./tasks/CronJob.js";
import app from "../app.js";

const cronJobInit = () => {
    // Replace with */15 * * * * // */60 * * * * *
    let showTime = cron.schedule("*/2 * * * *", async () => {
        app();
    });

    let coinCacheCron = cron.schedule(
        "*/60 * * * * *",
        () => {
            try {
                CoinCache.storePrices("new");
            } catch (err) {
                err;
            }
        },
        {
            scheduled: true,
            timezone: "Asia/Seoul",
        },
    );
};
setTimeout(() => {
    cronJobInit();
}, 10000);

export default cronJob;
