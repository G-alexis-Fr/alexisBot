import axios from "axios";
import dotenv from "dotenv";

const checkWallet = async () => {
    const auth_key = process.env.AUTH_KEY;

    return axios({
        method: "get",
        url: "http://localhost:3001/user/checkwallet",
        headers: { Authorization: `Bearer ${auth_key}` },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export default checkWallet;
