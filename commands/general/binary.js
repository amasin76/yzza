const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

    let choice = ["encode", "decode"];
    if (!choice.includes(args[0].toLowerCase())) return message.channel.send("Unknown parameter. Please choose the method first, either decode or encode it.");

    let text = args.slice(1).join(" ");
    // binary <encode | decode> <text>
    // binary encode blob development

    if (!text) return message.channel.send("Please input some text.");

    // Do this because more than that, the binary code wouldn't be fit anymore.
    if (text.length > 1024) return message.channel.send("Oww, that is way too much. The maximum character was 1,024.");

    function encode(char) {
        return char.split("").map(str => {
            const converted = str.charCodeAt(0).toString(2);
            return converted.padStart(8, "0");
        }).join(" ")
    };

    function decode(char) {
        return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
    };

    if (args[0].toLowerCase() === "encode") {
        return message.channel.send(encode(text));
    } else if (args[0].toLowerCase() === "decode") {
        return message.channel.send(decode(text));
    }
};

exports.help = {
    name: "binary",
    description: "Convert text to binary or otherwise.",
    usage: "binary <encode | decode> <text>",
    example: "binary encode blob development"
};

exports.conf = {
    aliases: [],
    cooldown: 5
}
