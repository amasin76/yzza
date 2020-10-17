const { MessageEmbed } = require("discord.js");
const pkg = require("../../package.json");

exports.run = async (client, message, args) => {
        const dependencies = Object.entries(pkg.dependencies).join(",\n");

        const embed = new MessageEmbed()
            .setTitle("All Dependencies")
            .setDescription(dependencies)
            .setTimestamp()
            .setFooter(message.author.username);

        message.channel.send(embed);
    }

exports.help = {
    name: "packages",
    description: "Shows a list of all bots dependencie",
    usage: "packages",
    example: "-invite"
}

exports.conf = {
    aliases: ["pck"],
    cooldown: 10
}