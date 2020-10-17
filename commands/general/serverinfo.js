const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#f3f3f3')
            .setTitle(`💖${message.guild.name}            📊server stats📊`)
            .addFields(
                {
                    name: "👑Owner: ",
                    value: `<@304703193294831617>`,
                    inline: true
                },
                {
                    name: "👥Members: ",
                    value: `__${message.guild.memberCount}__ users!`,
                    inline: true
                },
                {
                    name: "💚Members Online: ",
                    value: `__${message.guild.members.cache.filter(m => m.user.presence.status == "online").size}__ users online!`,
                    inline: true
                },
                {
                    name: "🤖Total Bots: ",
                    value: `__${message.guild.members.cache.filter(m => m.user.bot).size}__ bots!`,
                    inline: true
                },
                {
                    name: "💥Creation Date: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "🔰Roles Count: ",
                    value: `__${message.guild.roles.cache.size}__ Roles in this server.`,
                    inline: true,
                },
                {
                    name: `🌐Region: `,
                    value: region,
                    inline: true
                },
                {
                    name: `✅Verified: `,
                    value: message.guild.verified ? 'Server is verified' : `Isn't verified`,
                    inline: true
                },
                {
                    name: '🚀Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `__${message.guild.premiumSubscriptionCount}__ Boosters` : `No boosters`,
                    inline: true
                },
                {
                    name: "🎭Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `There are __${message.guild.emojis.cache.size}__ emojis!` : 'There are no emojis' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }

exports.help = {
  name: "Server-Info",
  description: "get info's about the server",
  usage: "server",
  example: "/server"
};

exports.conf = {
  aliases: ["server", "sr"],
  cooldown: 5 // This number is a seconds, not a milliseconds.
  // 1 = 1 seconds.
}