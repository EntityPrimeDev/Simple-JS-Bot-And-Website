const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const warnModel = require("../models/warn")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("delete-warning")
    .setDescription("delete a users warning")
    .addStringOption(o => {
        return o.setName("warnid")
        .setDescription("the id of the warn you want to remove")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.MODERATE_MEMBERS),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const id = interaction.options.getString("warnid");

        const data = await warnModel.findById(id);

        let NoData = new MessageEmbed()
        .setTitle("No Warn Using That Id Found")
        .setDescription(`You Have Entered A Invalid Warn ID.`)
        .setColor("BLURPLE")

        if(!data) return interaction.reply({ embeds: [NoData] });

        data.deleteOne();

        const user = interaction.guild.members.cache.get(data.userId);

        let emebed = new MessageEmbed()
        .setTitle("Warn Removed")
        .setDescription(`Removed A Warn From ${user}`)
        .setColor("BLURPLE")

        await interaction.reply({ embeds: [emebed] })
    }
}