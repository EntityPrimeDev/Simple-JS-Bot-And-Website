const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("gives you a random meme"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const res = await fetch(`https://api.popcat.xyz/meme`);

        const json = await res.json();
    
        const Embed = new MessageEmbed()
          .setColor("RANDOM")
          .setURL(json.url)
          .setTitle(json.title)
          .setImage(json.image)
          .setFooter(`👍 ${json.upvotes || 0} | 💬 ${json.comments || 0}`)
          .setTimestamp();
    
        return interaction.reply({ embeds: [Embed] });
    }
}