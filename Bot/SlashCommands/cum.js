const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const {client} = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("cum")
    .setDescription("shows you cum coming out"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const response = await fetch("http://api.nekos.fun:8080/api/cum");
        const body = await response.json();

        if(interaction.channel.nsfw) {
            let NSFW = new MessageEmbed()
            .setTitle(`Here Is Cum`)
            .setImage(`${body.image}`)
            .setColor("BLURPLE")
            
            return interaction.reply({ embeds: [NSFW]})
        } else {
            return interaction.reply({ content: `This Channel Is Not NSFW`});
        }
    }
}