const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const global = require("../Configs/staticClient.json")
const { DOMParser } = require('xmldom');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rlporn")
    .setDescription("gives you a picture of real porn")
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const xml = await fetch(`https://realbooru.com/index.php?page=dapi&s=post&q=index&id=${Math.floor(Math.random() * 10000) + 1}&cid=${Math.floor(Math.random() * 99999) + 1}&pid=${Math.floor(Math.random() * 20) + 1}&tags=porn&limit=1`)
        .then(response => response.text());
  
  
        const data = new DOMParser().parseFromString(xml, 'text/xml');
        const post = data.getElementsByTagName('post')[0];

        if(post) {
            let url = post.getAttribute("file_url");
            if(url) {
                if(interaction.channel.nsfw) {
                    let NSFW = new MessageEmbed()
                    .setTitle(`Here Is Some Real Porn`)
                    .setImage(url)
                    .setColor("BLURPLE")
                    
                    return interaction.reply({ embeds: [NSFW]})
                } else {
                    return interaction.reply({ content: `This Channel Is Not NSFW`});
                }
            } else {
                return interaction.reply({ content: `No Image Found!`})
            }
        } else {
            return interaction.reply({ content: `No Post Found!`})
        }
    }
}