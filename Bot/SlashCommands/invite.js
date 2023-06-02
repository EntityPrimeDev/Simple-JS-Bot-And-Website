const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("invite the bot to a new server"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {

        //             .setURL(`https://discord.com/api/oauth2/authorize?client_id=${global.Client.clientid}&permissions=8&scope=bot%20applications.commands`),

        let embed = new MessageEmbed()
        .setTitle(`Invite Me`)
        .setDescription(`The Invite And Website Of This Bot.`)
        .setColor("BLURPLE")
        

        let buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Invite")
            .setEmoji("🔗")
            .setURL(`${client.invite}`)
            .setStyle("LINK"),
            new MessageButton()
            .setLabel("Website")
            .setStyle("LINK")
            .setURL("https://serpent.wtf/")
            .setEmoji("🔗")
        )

        interaction.reply({ embeds: [embed], components: [buttons]})
    }
}