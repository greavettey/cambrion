const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { get } = require("axios");

const { shorten } = require("../../util/utils");

module.exports = class APODCommand extends Command {
    constructor() {
        super("apod", {
            aliases: ["apod"],
            description: "Returns NASA's astronomy picture of the day.",
            typing: true
        });
    }

    async exec(msg) {
        let td = new Date();
        td = `${td.getUTCFullYear()}-${td.getUTCMonth() + 1}-${td.getUTCDate()}`;

        let { data } = await get(`https://api.nasa.gov/planetary/apod?api_key=${this.client.config.nasa}&date=${td}`);

        const embed = new MessageEmbed()
            .setTitle(data.title)
            .setDescription(shorten(data.explanation, 300, "https://apod.nasa.gov/apod/"))
            .setImage(data.url)
            .setColor(this.client.color);

        data.copyright ? embed.setFooter(`Copyright © ${data?.copyright} • ${td.replace(/-/g, "/").split("/").reverse().join("/")}`) : embed.setFooter(`Cheers NASA • ${td.replace(/-/g, "/").split("/").reverse().join("/")}`);

        return msg.util.send(embed);
    }
}