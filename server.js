const Discord = require("discord.js");
const fetch = require('node-fetch');
const tutorialBot = require("./handler/ClientBuilder.js"); // We're gonna create this soon.
const client = new tutorialBot();

require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn); // This will warn you via logs if there was something wrong with your bot.
client.on("error", console.error); // This will send you an error message via logs if there was something missing with your coding.
client.login(process.env.SECRET).catch(console.error); // This token will leads to the .env file. It's safe in there.

//DM Reverse==============================================
client.on("message", (message) => {
            if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        let yumz = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Message To The Bot")
                    .addField(`Sent By:`, `<@${message.author.id}>`)
                    .setColor("#9e1c36")
                    .setThumbnail(`https://cdn.discordapp.com/icons/751562235415101523/a_5a094e44f5fc614002f3ac557287855b.gif?size=1024`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .addField(`Message: `, `\n\n\`\`\`${message.content}\`\`\``)
                    .setFooter(`Pepe Bot`)
                client.users.cache.get("484524591696576523").send(yumz)
            }
});

//Auto Pinging
let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`[${++count}] here i pinged ${process.env.URL}`)
    ),
  280000
);

//