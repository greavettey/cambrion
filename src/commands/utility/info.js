const { Command } = require("discord-akairo");
const { uptime, findMember } = require("../../util/utils");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class InfoCommand extends Command {
    constructor() {
        super("info", {
            aliases: ["info", "information", "about", "i"],
            description: "Information about me, myself and I.",
            typing: true
        });
    }

    exec(msg) {
        const embed = new MessageEmbed()
            .setTitle(`Cambrion v${this.client.version}`)
            .setDescription(stripIndents`              
                I was made by **stringtheory** ${findMember(msg, this.client.ownerID[0], false) ? "(<@!" + findMember(msg, this.client.ownerID[0], false) + ">)" : ""} in Node.JS using the Discord.js and Akairo libraries.

                I'm currently sitting in **${this.client.guilds.cache.size}** server${(this.client.guilds.cache.size > 1 ? "s" : "")}. I have **${this.client.commandHandler.modules.size}** useable commands, and a total uptime of **${uptime().humanized}**.
            `)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`Cambrion is the intellectual property of ${findMember(msg, this.client.ownerID[0], false) ? findMember(msg, this.client.ownerID[0], false).user.username: ""}. You can view Cambrion's privacy policy with ${this.client.prefix}privacy.`)
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}