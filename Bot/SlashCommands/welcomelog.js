const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const Schema = require("../models/WelcomeGoodbye")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-welcome-logs")
    .setDescription("when someone joins it tells you that they have joined")
    .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_GUILD)
    .addChannelOption(o => {
        return o.setName("channel")
        .setDescription("the channel for the logs to be sent to")
        .setRequired(true)
    }),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const WelcomeChannel = interaction.options.getChannel("channel");

        Schema.findOne({ Guild: interaction.guild.id }, (err, data) => {
            if(err) 
            {
                let EmbedError1 = new MessageEmbed()
                .setTitle("Hmmm Looks Like There Was A Error.")
                .setDescription("**:x: | Looks Like A Error Happend Please Contact The Developer And I Have Server Permissions.\n\nError: \n```js\n" + err + "```\n**")
                .setColor("RED")

                return interaction.reply({ embeds: [EmbedError1] });
            }
            if(data)
            {
                data.delete();
                new Schema({
                    Guild: interaction.guild.id,
                    Channel1: WelcomeChannel.id,
                }).save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channel1: WelcomeChannel.id,
                }).save();
            }
        })

        let EmbedGood1 = new MessageEmbed()
        .setTitle("Success")
        .setDescription("**✅ | Welcome And Leave Channel Now Setup.**")
        .setColor("GREEN")

        return interaction.reply({ embeds: [EmbedGood1] });
    }
}