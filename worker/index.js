import cron from "node-cron";
import DiscordService from "../services/DiscordService.js";
import CoinCache from "./tasks/CoinCache.js";
import cronJob from "./tasks/CronJob.js";
import app from "../app.js";

const cronJobInit = () => {
    // Replace with */15 * * * *
    let showTime = cron.schedule("*/55 * * * * *", async () => {
        app();
    });

    let coinCacheCron = cron.schedule(
        "*/60 * * * * *",
        () => {
            try {
                CoinCache.storePrices("new");
            } catch (err) {
                err += "a";
                DiscordService.sendMessage(
                    "error",
                    `cron storePrice %o, ${err}`,
                );
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
