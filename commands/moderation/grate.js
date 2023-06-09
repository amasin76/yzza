const Discord = require('discord.js');


exports.run = (client, msg, args) => {

    const member = msg.mentions.members.first();
    const rate = Math.random() * (100);
  
     if (msg.mentions.has('484524591696576523')) return msg.reply("**Rajli Sale7 💖 Full F7OULA 💥**");
    
     if (!member) {

        const rateembed = new Discord.MessageEmbed()
            .setColor("#ff00f4")
            .setTitle("Gay.rate :rainbow_flag:")
            .setDescription(`You are ${Math.floor(rate)}% gay!`)

        msg.channel.send(rateembed)

    } else if (member) {

        const memberrateembed = new Discord.MessageEmbed()
            .setColor("#ff00f4")
            .setTitle("Gay.rate :rainbow_flag:")
            .setDescription(`${member.displayName} is ${Math.floor(rate)}% gay!`)
       
        msg.channel.send(memberrateembed)
      }

}

exports.help = {
    name: "🔺",
    description: "de",
    usage: "clear <number>",
    example: "-clear 2"
}

exports.conf = {
    aliases: ["gay", "zmla"],
    cooldown: 20
}
