const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const {client} = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("suggest a feature to the owner")
    .addStringOption(o => {
        return o.setName("feature")
        .setDescription("the feature the user wants")
        .setRequired(true)
    }),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const feature = interaction.options.getString("feature");
        if(feature.length >= 100) {
            let limit = new MessageEmbed()
            .setAuthor(`Limit Reached`, client.user.avatarURL())
            .setDescription(`${interaction.user} Your Suggestion Contains More Than 100 Characters Please Keep It Under That To Help Prevent Spam!`)
            .setFooter(`Bot Made By ${package.author}`)
            .setColor("RED")

            interaction.reply({ embeds: [limit] })
        } else {
            const owner = client.users.cache.get("1080895493099487292");
            let success = new MessageEmbed()
            .setAuthor(`New Suggestion`, client.user.avatarURL())
            .setDescription(`${interaction.user.tag} Requests A New Suggestion!\n\nFeature:\n**${feature}**`)
            .setColor("RED")
            let s = new MessageEmbed()
            .setAuthor(`Thanks!!!!`, client.user.avatarURL())
            .setDescription(`I Have Passed Your Suggestion On To The Owner!`)
            .setColor("RED")
            interaction.reply({ embeds: [s]});
            owner.send({ embeds: [success]})
        }
    }
}