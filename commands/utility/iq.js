const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
        const iq = Math.floor(Math.random() * 100) + 1;

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .setTitle(`You're IQ: ${iq}`)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }

exports.help = {
    name: "iq",
    description: "Calc iq",
    usage: "--",
    example: "---"
}

exports.conf = {
    aliases: ["iq"],
    cooldown: 10
}