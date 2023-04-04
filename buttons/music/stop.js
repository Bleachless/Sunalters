const { useQueue } = require('discord-player');
const { toggleStop } = require("../../constants/index");
module.exports = {
    cooldown: 10,
    id: 'stop',
    async execute(i) {
        const queue = useQueue(i.guild.id);
        await toggleStop(i, queue);
    }
}