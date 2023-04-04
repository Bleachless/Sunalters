const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const DjCommand = require("../../schema/djCommand");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setdjcommand")
    .setDescription("Set a command to be only for DJs")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The command you want to reload")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("dj")
        .setDescription("Whether the command is only for DJs or not")
        .setRequired(true)
    ),


  async execute(i) {
    // Get the command name and whether it is for DJs or not
    const commandName = i.options.getString("command").toLowerCase();
    const dj = i.options.getBoolean("dj");
    const guildId = i.guild.id;

    // Get the command
    const command =
      i.client.slash_commands.get(commandName) ||
      i.client.slash_commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );  

    // Check if the command exists
    if (!command) {
      return i.reply({
        embeds: [
          {
            description: "That command does not exist",
            color: 0x0099ff,
          },
        ],
        ephemeral: true,
      });
    }

    // Check if the command is already a DJ command
    const existingCommand = await DjCommand.findOne({
      guildID: guildId,
      commandName: commandName,
      dj: true,
    });

    if (!dj) {
      // Check if the command is not a DJ command
      if (!existingCommand) {
        return i.reply({
          embeds: [
            {
              description: `The command ${commandName} is already available for all users`,
              color: 0x0099ff,
            },
          ],
          ephemeral: true,
        });
      }

      // Update the command to be available for all users
      await DjCommand.deleteOne({
        guildID: guildId,
        commandName: commandName,
      });

      return i.reply({
        embeds: [
          {
            description: `The command ${commandName} is no longer exclusive to DJs`,
            color: 0x0099ff,
          },
        ],
        ephemeral: true,
      });
    }

    // Check if the command is already a DJ command
    if (existingCommand) {
      return i.reply({
        embeds: [
          {
            description: `The command ${commandName} is already exclusive to DJs`,
            color: 0x0099ff,
          },
        ],
        ephemeral: true,
      });
    }

    if (dj) {
      const musicCommands = fs
        .readdirSync("./commands/music")
        .filter((file) => file.endsWith(".js"))
        .map((file) => file.replace(".js", ""));

      if (!musicCommands.includes(commandName)) {
        return i.reply({
          embeds: [
            {
              description: `The command \`${commandName}\` is not a music command`,
              color: 0x0099ff,
            },
          ],
          ephemeral: true,
        });
      }

      // Add the command to the DJ commands list
      const djCommand = new DjCommand({
        guildID: guildId,
        commandName: commandName,
        dj: true,
      });

      await djCommand.save();

      return i.reply({
        embeds: [
          {
            description: `The command ${commandName} is now exclusive to DJs`,
            color: 0x0099ff,
          },
        ],
        ephemeral: true,
      });
    }
  },
};
