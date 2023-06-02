const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction, MessageAttachment } = require("discord.js");
const {client} = require("../../server");
const package = require('../../package.json');
const puppeteer = require('puppeteer');
const NSFWJS = require('nsfwjs');

let NSFWTags = [
    "Porn",
    "PornHub",
    "porn",
    "pornhub",
    "porn hub",
    "xxxhub",
    "xxx",
    "rule34",
    "hentai",
    "Hentai",
    "sex",
    "Sex",
    "fortnite porn",
    "anime porn",
    "bdsm",
    "hardcore porn"
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName("google")
    .setDescription("Looks For Things On Google That You Searched Up.")
    .addStringOption(o => {
        return o.setName(`serach`)
        .setDescription("the thing you want to search")
        .setRequired(true)
    }),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const search = interaction.options.getString("search");

        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.goto(`https://www.${search}`);
        // const screenshot = await page.screenshot();


        // const attachment = new MessageAttachment(screenshot, 'screenshot.png');

        interaction.reply({  content: `:x: WOOOOO There Calm Down This Feature Is Still In Development!` })

    }
}