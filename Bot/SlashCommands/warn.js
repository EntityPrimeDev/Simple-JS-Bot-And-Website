const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const warnModel = require("../models/warn")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warn a user")
    .addUserOption(o => {
        return o.setName('target')
        .setDescription("the user to warn")
        .setRequired(true)
    })
    .addStringOption(o => {
        return o.setName("reason")
        .setDescription("the reason you want to warn them")
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
        const user = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason");
        
        new warnModel({
            userId: user.id,
            GuildId: interaction.guild.id,
            reason,
            ModId: interaction.user.id,
            timeStamp: Date.now(),
        }).save();

        let success = new MessageEmbed()
        .setAuthor("User Warned", client.user.displayAvatarURL())
        .setDescription(`${user} Was Warned For ${reason}!`)
        .setColor("BLURPLE")

        interaction.reply({ embeds: [success]});

        let sent = new MessageEmbed()
        .setAuthor("You Have Been Warned", client.user.displayAvatarURL())
        .setDescription(`You Have Been Warned In ${interaction.guild.name} For ${reason}`)
        .setColor("BLURPLE")

        user.send({ embeds: [sent]}).catch(err => { console.log("Could Not Send Message To User Warn COmmand ")});
    }
}