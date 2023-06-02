const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const {client} = require("../../server");
const package = require('../../package.json')
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' })
const simplydjs = require("simply-djs");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("play tictactoe")
    .addUserOption(o => {
        return o.setName("user")
        .setDescription("the user to play with")
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
        const member = interaction.guild.members.cache.get(user.id)
        //game.handleInteraction(interaction)
        // simplydjs.tictactoe(interaction, { 
        //    user: member
        // })
    }
}