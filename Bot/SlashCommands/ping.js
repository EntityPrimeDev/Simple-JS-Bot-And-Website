const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Tells You The Current Ping Of The Bot"),
    async execute(interaction) {
        let embed = new MessageEmbed()
        .setTitle(`Ping!!!`)
        .setDescription(`🏓 PONG, Current Bot Ping: ${client.ws.ping} MS!`)
        .setFooter(`Bot Made By: ${package.author}`)
        .setColor("BLURPLE")

        interaction.reply({ embeds: [embed]})
    }
}