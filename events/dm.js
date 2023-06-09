const Discord = require("discord.js");

module.exports = async (client, message) => {
        if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        let yumz = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Message To The Bot")
                    .addField(`Sent By:`, `<@${message.author.id}>`)
                    .setColor("#9e1c36")
                    .setThumbnail(`https://cdn.discordapp.com/icons/751562235415101523/a_5a094e44f5fc614002f3ac557287855b.gif?size=1024`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .addField(`Message: `, `\n\n\`\`\`${message.content}\`\`\``)
                    .setFooter(`Pepe Bot`)
                client.users.cache.get("484524591696576523").send(yumz)
            }
}