const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const djRole = require("../../schema/djRole");
const DjCommand = require("../../schema/djCommand");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setdjrole")
    .setDescription("Set a role as a DJ role")
    .addRoleOption((option) =>
      option
        .setName("djrole")
        .setDescription("The role you want to set as a DJ role")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("dj")
        .setDescription("Whether the role is a DJ role or not")
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(i) {

    const djCommand = await DjCommand.findOne({
      guildID: i.guild.id,
    });


    try {
      // Get the role and whether it is a DJ role or not
      const role = i.options.getRole("djrole");
      const dj = i.options.getBoolean("dj");
      const guildID = i.guild.id;


      // Check if the role is already a DJ role
      const djRoleDoc = await djRole.findOne({
        guildID: guildID,
        djRoleID: role.id,
        dj: true,
      });

      if (!dj) {
        if (!djRoleDoc) {
          return i.reply("No DJ role has been set for this guild.");
        }

        await djRole.deleteOne({
          guildID: guildID,
          djRoleID: role.id,
          dj: true,
        });

        return i.reply(`The DJ role ${role} has been removed.`);
      }

      if (djRoleDoc) {
        return i.reply(`A DJ role has already been set for this guild.`);
      }

      const newRoleDj = new djRole({
        guildID: guildID,
        djRoleID: role.id,
        dj: true,
      });
      await newRoleDj.save();

      const embed = new EmbedBuilder()
          .setTitle('🎉 DJ Role Set 🎉')
          .setDescription(`The DJ role has been set to ${role}.
          \n Congratulations! You have now been granted access to your previously set DJ commands. To enable DJ-only commands, please use the command /setdjcommand\n
          ${djCommand ? "Your DJ commands are now available for use." : "You do not have any DJ commands set up yet."}`)
          .setTimestamp()

      return i.reply({ embeds: [embed] 
      });
    } catch (err) {
      console.log(err);
    }
  },
};
