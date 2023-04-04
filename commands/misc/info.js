const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const DjCommand = require("../../schema/djCommand");
const DjRole = require("../../schema/djRole");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Shows info...")
    .setDMPermission(false),

  async execute(i) {
    await i.deferReply();

    const guildId = i.guild.id;

    const djCommands = await DjCommand.find({ guildID: guildId });
    const djRoleDoc = await DjRole.findOne({ guildID: guildId });

    const djCommandNames = djCommands.map((cmd) => cmd.commandName);

    const embed = new EmbedBuilder()
      .setTitle("Player Help Menu")
      .setDescription(
        "Here you can see all the commands that you can use to control the player."
      )
      .addFields(
        {
          name: "Role DJ",
          value: djRoleDoc ? `<@&${djRoleDoc.djRoleID}>` : "No DJ role set. Use \`/setdjrole\` to set a DJ role.",
        },
        {
          name: "DJ Commands",
          value: djCommandNames.length
            ? djCommandNames.join(", ")
            : "No DJ commands set. Use \`/setdjcommand\` to set a DJ command.",
        }
      );

    await i.editReply({ embeds: [embed] });
  },
};
