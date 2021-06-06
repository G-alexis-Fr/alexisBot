import axios from "axios";
import { readFileSync } from "fs";

import DiscordService from "./DiscordService.js";

class CryptoService {
    baseUrl = `https://api.coingecko.com/api/v3/`;

    getCoinPrice = async (coin_id, whichCoin) => {
        let coin_prices = JSON.parse(readFileSync(whichCoin));

        return coin_prices[coin_id].usd;
    };

    getCoinPriceOnline = async (coin_id) => {
        try {
            return await axios.get(
                `${this.baseUrl}/simple/price?ids=${coin_id}&vs_currencies=usd`,
            );
        } catch (error) {
            error += "a";
            DiscordService.sendMessage(
                "error",
                `getCoinPriceOnline err: %o, ${error}`,
            );
        }
    };
}

export default new CryptoService();
