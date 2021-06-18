import axios from "axios";
import { readFileSync } from "fs";

class CryptoService {
    baseUrl = `https://api.coingecko.com/api/v3/`;

    getCoinPrice = async (coin_id, whichCoin) => {
        try {
            let coin_prices = await JSON.parse(readFileSync(whichCoin));
            console.log(coin_prices[coin_id].usd);
            return coin_prices[coin_id].usd;
        } catch (error) {
            console.log(error);
        }
    };

    getCoinPriceOnline = async (coin_id) => {
        try {
            return await axios.get(
                `${this.baseUrl}/simple/price?ids=${coin_id}&vs_currencies=usd`,
            );
        } catch (error) {
            error;
        }
    };
}

export default new CryptoService();
