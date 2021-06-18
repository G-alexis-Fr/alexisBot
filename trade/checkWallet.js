import axios from "axios";
import dotenv from "dotenv";

const checkWallet = async () => {
    const auth_key = process.env.AUTH_KEY;
    console.log(auth_key);
    return axios({
        method: "get",
        url: "http://localhost:3000/user/checkwallet",
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
