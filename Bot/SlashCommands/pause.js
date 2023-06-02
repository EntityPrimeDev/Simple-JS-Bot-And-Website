const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pause a song"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        if(!interaction.member.voice.channel) return interaction.reply({ content: "Please join a voice channel first!" });
  
        let guildQueue = client.player.getQueue(interaction.guild.id);
        guildQueue.setPaused(true);
    
        //  let guildQueue = client.player.getQueue(interaction.guild.id)
        // .then(await guildQueue.setPaused(true));
        let embed = new MessageEmbed()
        .setTitle(`🎶Pausing🎶`)
        .setDescription(`Pausing The Song`)
        .setColor("AQUA")
    
        await interaction.reply({ embeds: [embed] })
    }
}