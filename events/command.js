const { Events, Collection } = require("discord.js");
const DjCommand = require("../schema/djCommand");
const djRole = require("../schema/djRole");
const { NOT_DJ, notSetDJ } = require("../constants/messages");
const check = require("../constants/verifications");
const {commandsthatneedcheck} = require("../constants/commands");

module.exports = {
  name: Events.InteractionCreate,

  async execute(i) {
    if (!i.isChatInputCommand()) return;
    const { client } = i
    
    const command = i.client.slash_commands.get(i.commandName);

    const guildId = i.guild.id;

    if (!command) return;

    //Cooldown System
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(i.user.id)) {
      const expirationTime = timestamps.get(i.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return i.reply({
          content: `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${i.commandName}\` command.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(i.user.id, now);
    setTimeout(() => timestamps.delete(i.user.id), cooldownAmount);
    //End of Cooldown System

    //check
    if (commandsthatneedcheck.includes(i.commandName)) {
      if (!check(i)) {
        return;
      }
    }
    
    const djRoleData = await djRole.findOne({
      guildID: guildId,
    });

    const djCommandData = await DjCommand.findOne({
      guildID: guildId,
      commandName: i.commandName,
    });

    if (djCommandData && djRoleData) {
      if (!i.member.roles.cache.has(djRoleData.djRoleID)) {
        return i.reply(notSetDJ);
      }
    } else if (djCommandData) {
      return i.reply(NOT_DJ);
    }

    try {
      await command.execute(i);
    } catch (error) {
      console.error(`Error executing ${i.commandName}`);
      console.error(error);
    }
  },
};
