import axios from "axios";
import DiscordService from "../services/DiscordService.js";
import dotenv from "dotenv";

const checkWallet = async () => {
    const auth_key = process.env.AUTH_KEY;

    return axios({
        method: "get",
        url: "http://localhost:3001/user/checkwallet",
        headers: { Authorization: `Bearer ${auth_key}` },
    }).then((response) => {
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        DiscordService.sendMessage(
            "cryptobot",
            `The script uses approximately ${used} MB to checkwallet`,
        );
        if (response.status === 200) {
            return response.data;
        }
        return false;
    });
};
export default checkWallet;
