const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
          if (!message.member.permissions.any(["ADMINISTRATOR"])) {
    return message.channel.send("You don't have perms to do this.");
  }
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('locked all channels');
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('unlocked all channels')
        }
    }

exports.help = {
    name: "lock+",
    description: "Not Allowed",
    usage: "N/A",
    example: "N/A"
}

exports.conf = {
    aliases: ["lock+"],
    cooldown: 8
}
