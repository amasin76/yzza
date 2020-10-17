const Discord = require('discord.js');
const os = require('os')
const { MessageEmbed } = require('discord.js');  
const { version } = require('discord.js');
const ms = require('ms');

exports.run = async (client, message, args) => {
        const uptime = ms(client.uptime, {
            long: true
        });
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('#000000')
            .addFields(
                {
                    name: '🌐 Servers',
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Channels',
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👥 Server Users',
                    value: `Serving ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: '🔋Uptime',
                    value: `${uptime}`,
                    inline: true
                },               
                {
                    name: '💽cpu Info',
                    value: `Cores: ${os.cpus().length}`,
                    inline: true
                },
                {
                    name: '📌Discord.js',
                    value: `v${version}`,
                    inline: true
                }, 
                {
                    name: '👑Developed by',
                    value: `<@484524591696576523>`,
                    inline: true
                },               
                {
                    name: '💓Join Date',
                    value: client.user.createdAt,
                    inline: true
                },                  
            
            )
            .setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL())

        await message.channel.send(embed)
    }

exports.help = {
  name: "Bot-Info",
  description: "get info's about the bot",
  usage: "bot",
  example: "/bot"
};

exports.conf = {
  aliases: ["bot"],
  cooldown: 5 // This number is a seconds, not a milliseconds.
  // 1 = 1 seconds.
}
