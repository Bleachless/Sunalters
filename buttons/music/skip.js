const { useQueue } = require("discord-player");
const { toggleSkip } = require("../../constants/index")

module.exports ={
	cooldown: 10,
    id: 'skip',
	async execute(i) {
		const queue = useQueue(i.guild.id);
		await toggleSkip(i, queue);
		}
	}
