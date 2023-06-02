const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction, version } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("tells you about the bot"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let totalCommands = 0
        client.commands.each((c) => {
          totalCommands++
        })
        const embed = new MessageEmbed()
        .setTitle(" > " + client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
          { name: "Developer", value: `${require(`../../package.json`).author}`, inline: true },
          {
            name: "Version",
            value: `${require(`../../package.json`).version}`,
            inline: true 
          },
          { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
          { name: "Users", value: `${client.users.cache.size}`, inline: true },
          { name: "Channels", value: `${client.channels.cache.size}`, inline: true },
          { name: "Emojis", value: `${client.emojis.cache.size}`, inline: true },
          { name: "Libary", value: `Discord.js: ${version}`, inline: true },
          { name: "Commands", value: `${totalCommands}`, inline: true },
          { name: "Support Server", value: `[\`Join Here\`](https://discord.gg/X3XaWwHj2D)`, inline: true },
          { name: "Uptime", value: `${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs`, inline: true },
          { name: "About", value: `I Am A Anime NSFW And Multi Purpose Bot!`, inline: true}
        )
        .setColor("BLURPLE")
          .setFooter(`${client.user.username} • Requested by ${interaction.user.tag}`, client.user.displayAvatarURL())
    
        interaction.reply({ embeds: [embed] });
    }
}