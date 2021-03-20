const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

module.exports = class InviteCommand extends Command {
    constructor() {
        super("invite", {
            aliases: ["invite"],
            description: "Returns a URL for you to invite me with.",
            typing: true
        });
    }
    
    exec(msg) {
        const embed = new MessageEmbed()
            .setDescription(`From here you can\n  •  invite me to your server [here](${this.client.urls.me}))`)
            .setColor(this.client.color)

        msg.util.send(embed);
    }
}