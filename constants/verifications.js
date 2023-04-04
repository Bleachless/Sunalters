const { useQueue } = require("discord-player");
const { NO_CHANNEL_VOICE, NOT_SAME_CHANNEL_VOICE, NO_QUEUE } = require("./messages");

module.exports = (i) => {
	const queue = useQueue(i.guild.id)

	// Check if the user is in a voice channel
	if (!i.member.voice.channelId) {
		i.reply(NO_CHANNEL_VOICE);
		return false;
	}

	// Check if the user is in the same voice channel as the bot
	if (
		i.guild.members.me.voice.channelId &&
		i.member.voice.channelId !== i.guild.members.me.voice.channelId
	) {
		i.reply(NOT_SAME_CHANNEL_VOICE);

		return false;
	}

	// Check if there is a queue
	if (!queue) {
		i.reply(NO_QUEUE);
		return false;
	}

	return true;
};





