import axios from "axios";
import dotenv from "dotenv";

const sellCoin = async (coin_id, quantity) => {
    dotenv.config();
    // const auth_key = process.env.AUTH_KEY;
    const auth_key = "4z4iaow#@1622527389343&%38oboltc";
    let req = axios({
        method: "post",
        url: "http://toco.wcoding.net/penguin/trade/sell",
        data: {
            id: `${coin_id}`,
            amount: `${quantity}`,
        },
        headers: { Authorization: `Bearer ${auth_key}` },
    }).then((response) => {
        if (response.status === 200) {
            try {
                let message = `You sold ${quantity} ${coin_id} for a total of : $${response.data.total_price}`;
                console.log(message);
            } catch (error) {
                error;
            }
        }
    });
};
export default sellCoin;
