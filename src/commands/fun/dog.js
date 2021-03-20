const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

module.exports = class DogCommand extends Command {
    constructor() {
        super("dog", {
            aliases: ["dog", "dawg"],
            description: "Gives you a picture of a dog.",
            typing: true
        });
    }

    async exec(msg) {
        let { data: dog} = await get("https://api.chewey-bot.top/dog", { headers: { "Authorization": this.client.config.chewey_bot }});

        const embed = new MessageEmbed()
            .setImage(dog.data)
            .setFooter("Powered by api.chewey-bot.top")
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}