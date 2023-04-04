const { InteractionType, ComponentType } = require("discord-api-types/v10");
const DjCommand = require("../schema/djCommand");
const djRole = require("../schema/djRole");
const { NOT_DJ, notSetDJ } = require("../constants/messages");
const check = require("../constants/verifications");
const { Events, Collection } = require("discord.js");
const { commandsthatneedcheck } = require("../constants/commands");

module.exports = {
  name: Events.InteractionCreate,

  async execute(i) {
    const { client } = i;

    if (i.type !== InteractionType.MessageComponent) return;

    if (i.componentType !== ComponentType.Button) return;

    const button = client.buttons.get(i.customId);

    const guildId = i.guild.id;

    if (!button) return;

     //Cooldown System
     if (!client.cooldowns.has(button.name)) {
      client.cooldowns.set(button.name, new Collection());
    }

    const now = Date.now();
    const timestamps = client.cooldowns.get(button.name);
    const cooldownAmount = (button.cooldown || 3) * 1000;

    if (timestamps.has(i.user.id)) {
      const expirationTime = timestamps.get(i.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return i.reply({
          content: `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${i.customId}\` command.`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(i.user.id, now);
    setTimeout(() => timestamps.delete(i.user.id), cooldownAmount);
    //End of Cooldown System

    if (commandsthatneedcheck.includes(i.customId)) {
      if (!check(i)) {
        return;
      }
    }

    const djRoleData = await djRole.findOne({
      guildID: guildId,
    });

    const djCommandData = await DjCommand.findOne({
      guildID: guildId,
      commandName: i.customId,
    });

    if (djCommandData && djRoleData) {
      if (!i.member.roles.cache.has(djRoleData.djRoleID)) {
        return i.reply(notSetDJ);
      }
    } else if (djCommandData) {
      return i.reply(NOT_DJ);
    }


    try {
      await button.execute(i);
      return;
    } catch (error) {
      console.log(error);
      return i.reply({
        content: "An error occurred while executing this button!",
        ephemeral: true,
      });
    }
  },
};
