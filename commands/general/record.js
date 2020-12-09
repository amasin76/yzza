const fs = require("fs");

exports.run = async (client, message, args) => {
    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Please join a voice channel first!");

    const connection = await message.member.voice.channel.join();
    const receiver = connection.receiver.createStream(message.member, {
        mode: "pcm",
        end: "silence"
    });

    const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
    writer.on("finish", () => {
        message.member.voiceChannel.leave();
        message.channel.send("Finished writing audio");
    });

}

exports.help = {
    name: "record",
    description: "record vioce",
    usage: "--",
    example: "--"
}

exports.conf = {
    aliases: ["rec"],
    cooldown: 8
}
