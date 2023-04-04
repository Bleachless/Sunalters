const { useQueue } = require('discord-player');
const { toggleResume } = require("../../constants/index")

module.exports = {
    cooldown: 10,
    id: 'resume',
    async execute(i) {
        const queue = useQueue(i.guild.id);
        await toggleResume(i, queue);
    }
}