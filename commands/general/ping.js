const Discord = require('discord.js');
const ms = require('ms');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {/*
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
*/
        const msg = await message.channel.send('Pinging... :ping_pong:');
        const latency = msg.createdTimestamp - message.createdTimestamp;
        const api = client.ws.ping;
        const uptime = ms(client.uptime, {
            long: true
        });
        msg.delete();
        const embed = new MessageEmbed()
            .setAuthor('📶Ping :')
            .addField('Latency :hourglass:', `\`${latency}ms\``, true)
            .setColor('#00ff07')
            .addField('API :heartbeat:', `\`${api}ms\``, true)
            .addField('Uptime :arrow_up_small:', `\`${uptime}\``, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTimestamp();
        return message.channel.send(embed);
}

exports.help = {
  name: "ping",
  description: "Ponged!",
  usage: "/ping",
  example: "/ping"
};

exports.conf = {
  aliases: ["beep"],
  cooldown: 5 // This number is a seconds, not a milliseconds.
  // 1 = 1 seconds.
}
