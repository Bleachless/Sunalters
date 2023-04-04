const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
const { lyricsExtractor } = require("@discord-player/extractor");
const { ERROS } = require("../../constants/messages.js");
const dotenv = require("dotenv");

module.exports = {
  cooldown: 10,
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Get lyrics for a song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song you want to get lyrics for")
        .setRequired(false)
    )
    .setDMPermission(false),
  async execute(i) {
    dotenv.config();
    const queue = useQueue(i.guild.id);
    const song = i.options.getString("song");

    await i.deferReply();

    const lyricsFinder = lyricsExtractor(
      process.env.genius
    );

    i.editReply({
      content: "🔍 Searching for lyrics...",
    });

    if (!song && !queue) {
      return i.editReply({
        embeds: [
          {
            description: "No song is currently playing. Please provide a song name.",
            color: 0x0099ff,
          },
        ],
      });
      }
  
    try {
      const lyrics = await lyricsFinder.search(
        song ? song : queue.currentTrack.title
      );

      if (!lyrics) {
        return i.editReply({
          content: "❌ No lyrics were found for this song.",
        });
      }

      //credits to discord-player example
      const trimmedLyrics = lyrics.lyrics.substring(0, 4000);

      const embed = new EmbedBuilder()
        .setTitle(lyrics.title)
        .setURL(lyrics.url)
        .setThumbnail(lyrics.thumbnail)
        .setAuthor({
          name: lyrics.artist.name,
          iconURL: lyrics.artist.image,
          url: lyrics.artist.url,
        })
        .setDescription(
          trimmedLyrics.length === 4000 ? `${trimmedLyrics}...` : trimmedLyrics
        )
        .setColor("Random");

      return i.editReply({
        content: "✅ Lyrics found!",
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);
      return i.editReply(ERROS)
    }
  },
};