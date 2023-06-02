const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ass")
    .setDescription("a random pic of a ass"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const response = await fetch("http://api.obutts.ru/butts/0/1/random");
        const body = await response.json();

        if(interaction.channel.nsfw) {
            let NSFW = new MessageEmbed()
            .setTitle(`Here Is A Ass`)
            .setImage(`http://media.obutts.ru/${body[0].preview}`)
            .setColor("BLURPLE")
            
            return interaction.reply({ embeds: [NSFW]})
        } else {
            return interaction.reply({ content: `This Channel Is Not NSFW`});
        }
    }
}