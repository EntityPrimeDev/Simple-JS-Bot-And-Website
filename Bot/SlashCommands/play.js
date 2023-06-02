const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a song")
    .addStringOption(o => {
        return o.setName("song")
        .setDescription("the song you want to play")
        .setRequired(true)
    }),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction, args) {
        const songs = interaction.options.getString("song")
        if(!interaction.member.voice.channel) return interaction.reply({ content: "Please join a voice channel first!" });

        let queue = client.player.createQueue(interaction.guild.id);
        await queue.join(interaction.member.voice.channel);
        let song = await queue.play(songs).catch(_ => {
            if(!queue)
                queue.stop();
        });

        let embed = new MessageEmbed()
        .setTitle(`🎶Playing🎶`)
        .setDescription(`🎶 ${song} has been added to the queue`)
        .setColor("AQUA")
        interaction.reply({ embeds: [embed] })
    }
}