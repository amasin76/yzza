const { feedBackChannelId } = require("../../config.json");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const feedback = args.join(" ");

    if (!feedback)
      return message.channel.send(
        "If u wanna be nice give some feedback."
      );

    if (!feedBackChannelId || feedBackChannelId === "") return;

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${message.author.username} New Feedback`)
      .setDescription(feedback)
      .setFooter(message.author.username)
      .setTimestamp();

    client.channels.cache.get(feedBackChannelId).send(embed);

    message.channel.send("Successfully send feedback!");
  }

exports.help = {
    name: "feedback",
    description: "Give feedback about the bot",
    usage: "packages",
    example: "-invite"
}

exports.conf = {
    aliases: ["fdb"],
    cooldown: 10
}