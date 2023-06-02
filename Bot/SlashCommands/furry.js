const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("furry")
    .setDescription("furry precentage"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const amount = Math.floor(Math.random() * 100);

        let embed = new MessageEmbed()
        .setTitle(`Your Furry %`)
        .setDescription(`Your Furry Precentage Is ${amount}%`)
        .setColor("BLURPLE")

        interaction.reply({ embeds: [embed]})
    }
}