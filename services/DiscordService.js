import Discord from "discord.js";

class DiscordService {
    bot = null;

    init() {
        this.bot = new Discord.Client();
        this.bot.login(process.env.DISCORD_TOKEN);
    }
    sendMessage(channelName, messageObj) {
        if (this.bot) {
            let channelId;
            // Discord uses Map type. I'm using for .. of to iterate through it.
            for (let key of this.bot.channels.cache) {
                const channel = key[1];
                if (channel.name === channelName) {
                    channelId = key[1].id;
                    break;
                }
            }
            if (channelId) {
                this.bot.channels.cache.get(channelId).send(messageObj);
            }
        }
    }
}

export default new DiscordService();
