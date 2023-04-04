const {
  GatewayIntentBits,
  Client,
  Collection,
  Partials,
} = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

const handlersDir = join(__dirname, "./handlers");
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.events = new Collection();

(async () => {
  await client.login(process.env.token);
})();
