import CryptoService from "../../services/CryptoService.js";
import { supportedCoins } from "../../util/trade.js";
import { writeFile, readFile } from "fs";
import { new_coin_prices_dir, old_coin_prices_dir } from "../../util/config.js";

class CoinCache {
    storePrices = async (storingCoin) => {
        // get prices from coin gecko
        try {
            const coinPrices = await CryptoService.getCoinPriceOnline(
                supportedCoins.join("%2C"),
            );

            // console.log(coinPrices.data);

            if (storingCoin === "new") {
                console.log("starting to store new coin prices");
                // store them in json file
                writeFile(
                    new_coin_prices_dir,
                    `${JSON.stringify(coinPrices.data)}`,
                    "utf8",
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("DONE UPDATING NEW STATS RECORDS");
                    },
                );
            } else {
                console.log("starting to store old coin prices");
                // store them in json file
                writeFile(
                    old_coin_prices_dir,
                    `${JSON.stringify(coinPrices.data)}`,
                    "utf8",
                    (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log("DONE UPDATING OLD STATS RECORDS");
                    },
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export default new CoinCache();
