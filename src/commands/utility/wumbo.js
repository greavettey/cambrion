const { Command } = require("discord-akairo");
const { emojiURL } = require("../../util/utils");
const { MessageEmbed, Util } = require("discord.js");

module.exports = class WumboCommand extends Command {
    constructor() {
        super("wumbo", {
            aliases: ["wumbo", "emoji"],
            description: "Wumbo dat shit™️",
            typing: true,
            args: [
                {
                    id: "emoji",
                    type: "string",
                    match: "content"
                }
            ]
        });
    }

    exec(msg, { emoji }) {
        if(!emoji) return msg.util.send("I need an input.");

        const parsed = Util.parseEmoji(emoji)

        if (parsed == null) return msg.util.send("That isn't a valid emoji.");

        const url = emojiURL(parsed.id, parsed.animated);

        let embed = new MessageEmbed()
            .setImage(url)
            .setColor(this.client.color);

        return msg.util.send(embed);
    }
}