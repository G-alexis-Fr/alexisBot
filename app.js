import cronJob from "./worker/index.js";
import checkWallet from "./trade/checkWallet.js";
import { supportedCoins } from "./util/trade.js";
import { new_coin_prices_dir, old_coin_prices_dir } from "./util/config.js";
import CryptoService from "./services/CryptoService.js";
import DiscordService from "./services/DiscordService.js";
import CoinCache from "./worker/tasks/CoinCache.js";
import buyCoin from "./trade/buyCoin.js";
import sellCoin from "./trade/sellCoin.js";

const app = async () => {
    for (const coin_id in supportedCoins) {
        let oldCoinPrice = await CryptoService.getCoinPrice(
            supportedCoins[coin_id],
            old_coin_prices_dir,
        );
        let newCoinPrice = await CryptoService.getCoinPrice(
            supportedCoins[coin_id],
            new_coin_prices_dir,
        );

        let pourcent = ratio(oldCoinPrice, newCoinPrice);

        await takeADecisionMate(
            pourcent,
            supportedCoins[coin_id],
            newCoinPrice,
        );
    }
    await CoinCache.storePrices("old");
};

const ratio = (lastBalance, NewBalance) => {
    return (((NewBalance - lastBalance) / lastBalance) * 100).toFixed(2);
};

const takeADecisionMate = async (pourcent, coin_id, priceOfCoin) => {
    let wallet = await checkWallet();

    try {
        if (parseFloat(pourcent) > 1.5) {
            for (let i = 10; i > 0; i--) {
                if (i * priceOfCoin + 5 < parseFloat(wallet.usd)) {
                    buyCoin(coin_id, i);
                    break;
                }
            }
        } else if (parseFloat(pourcent) < 0.6) {
            for (const coin in wallet.coins) {
                if (
                    wallet.coins[coin].id.toString() === coin_id &&
                    parseFloat(wallet.usd) >= 5
                ) {
                    let coinTotal = wallet.coins[coin].amount;
                    coinTotal > 0 ? sellCoin(coin_id, coinTotal) : coinTotal;
                }
            }
        }
    } catch (error) {
        DiscordService.sendMessage("error", error);
    }
};

export default app;