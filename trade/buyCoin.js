import axios from "axios";
import dotenv from "dotenv";

const buyCoin = async (coin_id, quantity) => {
    dotenv.config();
    const auth_key = process.env.AUTH_KEY;

    let req = axios({
        method: "post",
        url: "http://localhost:3001/trade/buy",
        data: {
            id: `${coin_id}`,
            amount: `${quantity}`,
        },
        headers: { Authorization: `Bearer ${auth_key}` },
    }).then((response) => {
        if (response.status === 200) {
            try {
                let message = `You purchased ${quantity} ${coin_id} for a total of : $${response.data.total_price}`;
            } catch (error) {
                error;
              
            }
        }
    });
};
export default buyCoin;
