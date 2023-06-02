const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("member count of the server"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        let embed = new MessageEmbed()
        .setTitle(`Member Count Of ${interaction.guild.name}`)
        .setDescription(`MemberCount: ${interaction.guild.memberCount}`)
        .setColor("BLURPLE")

        interaction.reply({ embeds: [embed]})
    }
}