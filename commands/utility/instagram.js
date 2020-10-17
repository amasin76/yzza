const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");


/*exports.run = async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(`Please Enter a Channel Name`)
        }
        let url, response, account, details;
        try {
            url = `https://instagram.com/${args[0]}/?__a=1`;
            response = await axios.get(url)
            account = response.data
            details = account.graphql.user
        } catch (error) {
            return message.channel.send(`Not A Account`)
        }

        const embed = new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            )
        await message.channel.send(embed)

    }*/

exports.run = async (client, message, args) => {
    const username = args[0];

    if (!username) {
      return message.channel.send("Please provide a username");
    }

    const url = `https://instagram.com/${username}/?__a=1`;
    let result;
    try {
      result = await fetch(url).then((res) => res.json());
    } catch (e) {
      return message.channel.send("The requested account was not found.");
    }

    if (!result.graphql) {
      return message.channel.send("The requested account was not found");
    }


    const account = result.graphql.user;
    const isPrivate = account.is_private
      ? "Yes, this profile is private."
      : "Nope, this isn't private.";
    const isVerified = account.is_verified
      ? "Yes, this profile is verified."
      : "Nope, this profile isn't verified.";

    const embed = new MessageEmbed()
      .setAuthor(account.username)
      .setTitle(
        `${account.full_name ? account.full_name : account.username}'s Profile`
      )
      .setColor("BLUE")
      .addField("Private?", isPrivate, true)
      .addField("Verified?", isVerified, true)
      .addField("Followers Count", account.edge_followed_by.count, true)
      .addField("Following Count", account.edge_follow.count, true)
      .addField("External URL", account.external_url, true)
      .setDescription(`Bio: ${account.biography}`)
      .setThumbnail(account.profile_pic_url_hd)
      .setFooter(message.author.username);

    message.channel.send(embed);
  },


exports.help = {
    name: "instagram",
    description: "delete msgs",
    usage: "clear <number>",
    example: "-clear 2"
}

exports.conf = {
    aliases: ["insta", "sg"],
    cooldown: 8
}
