const {MessageEmbed}= require('discord.js')
const warns = require('../../models/ModSchema');

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`No user specified!`);
    warns.find(
      { GuildID: message.guild.id, UserID: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data.length)
          return message.channel.send(
            `${user.user.tag} has not got any warns in this guild!`
          );
        let Embed = new MessageEmbed()
          .setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
          .setDescription(
            data.map((d) => {
              return d.Punishments.map(
                (w, i) =>
                  `${i} - Moderator: ${
                    message.guild.members.cache.get(w.Moderator).user.tag
                  } Reason: ${w.Reason}`
              ).join("\n");
            })
          );
        message.channel.send(Embed);
      }
    );
  //},
};

exports.help = {
    name: "warns",
    description: "warn system",
    usage: "warn @user",
    example: "warn @alex"
}

exports.conf = {
    aliases: ["warns"],
    cooldown: 5
}
