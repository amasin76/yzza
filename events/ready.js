
module.exports = async client => {
     console.log(`${client.user.username} im ready`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});
    let userIn = await client.users.cache.size;
    let statuses = [
        //`${client.guilds.size} servers!`,
        "8help",
        "💖THE EPICS💖",
        "صلوا على شفيع الأمة",
        `💖${userIn} 𝙐𝙎𝙀𝙍𝙎💖`,
        "Javascript",
        "V1.1",
        "By | 7ANKALISS✨",
        `💖${userIn} 𝙐𝙎𝙀𝙍𝙎💖`,
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});

    }, 30000)

}
