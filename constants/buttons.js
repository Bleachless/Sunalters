const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
  const rw = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji("⏸️")
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId("resume")
    .setEmoji("▶️")
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder() 
     .setCustomId("back")
      .setEmoji("⏪")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("skip")
      .setEmoji("⏭️")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId("stop")
      .setEmoji("⏹️")
      .setStyle(ButtonStyle.Success),
  );

module.exports = {
    rw
}
