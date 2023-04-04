const { Collection } = require("discord.js");
const { join } = require("path");
const { readdirSync } = require("fs");
const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
module.exports = (client) => {
  client.slash_commands = new Collection();
  const commands = [];

  const commandPath = join(__dirname, "../commands");
  readdirSync(commandPath).forEach((dir) => {
    let commandFiles = readdirSync(`${commandPath}/${dir}`).filter((file) =>
      file.endsWith(".js")
    );
    for (let file of commandFiles) {
      const command = require(`${commandPath}/${dir}/${file}`);
      commands.push(command.data.toJSON());
      client.slash_commands.set(command.data.name, command);
    }
  });

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  (async () => {
    try {
      await rest.put(Routes.applicationGuildCommands(process.env.app_id, process.env.test_guild_id), {
        body: commands,
      });
      console.log(chalk.green("Successfully registered application commands. 🚀"));
    } catch (error) {
      console.error(error);
    }
  })();
};
