exports.run = async (client, message, args) => {
    const botInvite =
      `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`;

    return message.channel.send(`Invite me here! ${botInvite}`);
  }

exports.help = {
    name: "invite",
    description: "invite bot to your server",
    usage: "invite",
    example: "-invite"
}

exports.conf = {
    aliases: ["add"],
    cooldown: 10
}