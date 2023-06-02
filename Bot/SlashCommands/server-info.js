const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("info on the server"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        let emebed = new MessageEmbed()
        .setTitle(`Server Info On ${interaction.guild.name}`)
        .setDescription(`Here Is Some Info On ${interaction.guild.name}:`)
        .addFields(
            {
                name: `Name: `,
                value: `${interaction.guild.name}`
            },
            {
                name: `ID: `,
                value: `${interaction.guild.id}`
            },
            {
                name: `MemberCount: `,
                value: `${interaction.guild.memberCount}`
            },
            {
                name: `Owner: `,
                value: `<@${interaction.guild.ownerId}>`
            }
        )
        .setColor("BLURPLE")

        interaction.reply({ embeds: [emebed]})
    }
}