import axios from "axios";
import dotenv from "dotenv";

const checkWallet = async () => {
    // const auth_key = process.env.AUTH_KEY;
    const auth_key = "4z4iaow#@1622527389343&%38oboltc";
    console.log(auth_key);
    return axios({
        method: "get",
        url: "http://toco.wcoding.net/penguin/user/checkwallet",
        headers: { Authorization: `Bearer ${auth_key}` },
    })
        .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                return response.data;
            }
            return false;
        })
        .catch((error) => {
            console.log("nope");
        });
};
export default checkWallet;
