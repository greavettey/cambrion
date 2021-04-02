const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require("discord-akairo");
const { join  } = require("path");
const { createHash } = require("crypto");
const signale = require("signale");

const config = require("../../config.js");
const { version } = require("../../package.json");

module.exports = class CamClient extends AkairoClient {
    constructor() {
        super({
            ownerID: config.botAdmins,
        }, {
            disableMentions: "everyone"
        });

        /** Assign prefix and other junk to class props */
        this.config = config;
        this.prefix = this.config.prefix;
        this.version = version;
        this.presenceDelay = 300000;

        this.urls = {
            server: "https://discord.gg/cYxEDNN",
            me: "https://discord.com/oauth2/authorize?client_id=378909180666314754&permissions=8&scope=bot"
        }

        this.oldColor = 0xFF69B4; // Hot Pink for archival purposes.
        this.color = 0xf6ad46;    // Burnt Orange colour used in avatar.

        this.fakeToken = createHash("md5").update("jack is a pee pee poo poo haha").digest("hex"); // hehe

        this.pokemonChannels = [
            "822484043937087518", // KANTO
            "822484140238176266", // JOHTO
            "822484400426975254", // HOENN
            "822484438771564596", // SINNOH
            "822484465443536936", // UNOVA
            "822484499941556224", // KALOS
            "822484534427385918", // ALOLA
            "822484558594179072", // GALAR
        ];

        this.commandsExecuted = 0;
        this.messagesSeen = 0;

        (process.argv.includes("--debug" || "--d")) ? this.debug = true: this.debug = false;
        this.logger = signale;

        /** Create handlers for Commands, Listeners (events), and inhibitors */
        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, "..", "commands"),
            prefix: this.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            automateCategories: true,
            argumentDefaults: {
                prompt: {
                    timeout: "Time ran out, so I cancelled the command.",
                    ended: "There were too many retries, so I cancelled the command.",
                    cancel: "That command's been cancelled.",
                    retries: 4,
                    time: 100000
                }
            }
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: join(__dirname, "..", "listeners"),
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: join(__dirname, "..", "inhibitors"),
        });
    }

    /**
     * Initializes Cambrion.
     * @param {string} token The bot token
     */
    init(token = this.config.token) {
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });
        
        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

        this.listenerHandler.loadAll();
        this.inhibitorHandler.loadAll();

        return super.login(token);
    }
}