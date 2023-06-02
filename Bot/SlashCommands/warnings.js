const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const warnModel = require("../models/warn")
const moment = require("moment")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("show-warnings")
    .setDescription("find out how many warnings a user has")
    .addUserOption(o => {
        return o.setName("user")
        .setDescription("the user you want to find warnings on")
        .setRequired(true)
    }),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const user = interaction.options.getUser("user");

        const userWarning = await warnModel.find({ userId: user.id, GuildId: interaction.guildId });

        let NoWarns = new MessageEmbed()
        .setTitle("No Warns")
        .setDescription(`${user} Has 0 Warnings.`)
        .setColor('BLURPLE')

        if(!userWarning?.length) return interaction.reply({ embeds: [NoWarns] });

        const embedDesc = userWarning.map((warn) => {
            const moderator = interaction.guild.members.cache.get(warn.ModId);

            return [
                `warnId: ${warn._id}`,
                `Moderator: ${moderator || 'Has Left The Server.'}`,
                `Date: ${moment(warn.timeStamp).format("MMMM Do YYYY")}`,
                `Reason: ${warn.reason}`
            ].join("\n");
        }).join("\n\n")

        let Warnings = new MessageEmbed()
        .setTitle(`${user} Warnings`)
        .setDescription(embedDesc)
        .setColor("BLURPLE")

        await interaction.reply({ embeds: [Warnings]})
    }
}