const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop a song"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({ content: "Please join a voice channel first!" })

        let queue = client.player.createQueue(interaction.guild.id);
        queue.stop();
    
        let embed = new MessageEmbed()
        .setTitle(`🎶Stopping🎶`)
        .setDescription(`Now Stopping The Music`)
        .setColor(`AQUA`)
        interaction.reply({ embeds: [embed] });
    }
}