const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("gay-tracker")
    .setDescription("your gay precentage"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const amount = Math.floor(Math.random() * 100);

        let embed = new MessageEmbed()
        .setTitle(`Your Gay %`)
        .setDescription(`Your Gay Precentage Is ${amount}%`)
        .setColor("BLURPLE")

        interaction.reply({ embeds: [embed]})
    }
}