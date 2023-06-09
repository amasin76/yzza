const discord = require("discord.js")
const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
  
let msg = await message.channel.send({
  embed: {
    "description": "Getting The Information...",
    "color": "YELLOW"
  }
})
    
   
    if(!args[0] || args[0].toLowerCase() === "all" || args[0].toLowerCase() === "global") {
       try {
      let corona = await fetch("https://disease.sh/v3/covid-19/all")
      corona = await corona.json()
      
      let embed = new discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("GREEN")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
     
      return msg.edit(embed)
      } catch(err) {
    
    msg.edit({embed: {
      
      "description": "Something went wrong :/",
      "color": "RED"
    }})
  }
      
      
    } else {

       try {

      let corona = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      corona = await corona.json()
      
      let embed = new discord.MessageEmbed()
      .setTitle(`${corona.country.toUpperCase()}`)
      .setColor("GREEN")
      .setDescription("Sometimes cases number may differ from small amount.")
      .setThumbnail(corona.countryInfo.flag || "")
      .addField("🧪Today's Cases", corona.todayCases, true)
      .addField("❌Today's Deaths", corona.todayDeaths, true)
      .addField("🚪Active Cases", corona.active, true)   
      .addField("📋Total Cases", corona.cases, true)
      .addField("💀Total Deaths", corona.deaths, true)
      .addField("✅Total Recovered", corona.recovered, true);

      
      return msg.edit(embed)

      } catch(err) {
    
    msg.edit({embed: {
      
      "description": "Unable to find the Information related to given country!",
      "color": "RED"
    }})
  }
      
      
    }
    
  

  }






/*
const fetch = require('node-fetch');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('You are missing some args (ex: ;covid all || ;covid Canada)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Invalid country provided')
            })
        }
    }
*/
exports.help = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",
    usage: "corona all or <country>",
    example: "covid germany"
}

exports.conf = {
    aliases: ["covid", "corona", "c19"],
    cooldown: 8
}