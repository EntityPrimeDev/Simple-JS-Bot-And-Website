const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
const { DOMParser } = require('xmldom');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rule34")
    .setDescription("gives you a picture of rule34.")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const xml = await fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&id=${Math.floor(Math.random() * 10000) + 1}&cid=${Math.floor(Math.random() * 10000) + 1}&pid=${Math.floor(Math.random() * 10) + 1}&tags=porn&limit=1`)
        .then(response => response.text());
  
  
        const data = new DOMParser().parseFromString(xml, 'text/xml');
        const post = data.getElementsByTagName('post')[0];

        if(!post) return interaction.reply({ content: `No Image Found!`})
  
        if(interaction.channel.nsfw) {
            let NSFW = new MessageEmbed()
            .setTitle(`Here Is Some Rule34`)
            .setImage(post.getAttribute("file_url"))
            .setColor("BLURPLE")
            
            return interaction.reply({ embeds: [NSFW]})
        } else {
            return interaction.reply({ content: `This Channel Is Not NSFW`});
        }
    }
}