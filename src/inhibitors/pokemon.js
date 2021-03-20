const { Inhibitor } = require("discord-akairo");

module.exports = class PokemonInhibitor extends Inhibitor {
    constructor() {
        super("pokemon", {
            reason: "Pokemon Auto Deletion"
        });
    }

    async exec(message) {
        let chan = message.channel;
        if (this.client.pokemonChannels.includes(chan.id)) return true;
    }
}