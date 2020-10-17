// Choose one of them.
// Don't copy-paste it just like that.
// Learn the system first.
// Thank you. -h.

const {MessageEmbed} = require("discord.js");
const db = require("quick.db");

module.exports = async (client, message) => {
    if (message.partial) await message.fetch();
    // In before, this will help you to fetch or get the previous content since the bot get started.

    let modlog = db.get(`moderation.${message.guild.id}.modlog`);
    if (!modlog) return;
    // Return if it's not enabled.

    if (message.channel.id === modlog.channel) return;
    // This will prevent any chaos when deleting some message inside the modlog.

    let toggle = modlog.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const embed = new MessageEmbed()
    .setTitle("Message Deleted")
    .setDescription(`Message deleted in <#${message.channel.id}> by **${message.author.tag}** \n> ${message.content}`)
    .setTimestamp()
    .setColor(0xcc5353)

    return message.guild.channels.cache.get(modlog.channel).send(embed);
}
