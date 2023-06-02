const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("feet")
    .setDescription("a pic of feet"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const response = await fetch("http://api.nekos.fun:8080/api/feet");
        const body = await response.json();

        if(interaction.channel.nsfw) {
            let NSFW = new MessageEmbed()
            .setTitle(`Here Is A Pic Of Feet`)
            .setImage(body.image)
            .setColor("BLURPLE")
            
            return interaction.reply({ embeds: [NSFW]})
        } else {
            return interaction.reply({ content: `This Channel Is Not NSFW`});
        }
    }
}