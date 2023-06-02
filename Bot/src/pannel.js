const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction, MessageActionRow, MessageSelectMenu } = require("discord.js");
const package = require('../../package.json')
const rrModel = require("../models/reactionroles");
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("pannel")
    .setDescription("the rr pannel")
    .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_ROLES),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const guildData = await rrModel.findOne({ guildId: interaction.guildId });

        let nodata = new MessageEmbed().setColor("RED")
        .setDescription(`${global.emojis.error} | No Data Found For That Role!`)

        if(!guildData) return interaction.reply({ embeds: [nodata] });

        const options = guildData.roles.map(x => {
            const role = interaction.guild.roles.cache.get(x.roleId);

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || "No Description",
                emoji: x.roleEmoji
            };
        })

        const pannelEmbed = new MessageEmbed()
        .setTitle("Please Pick A Role Below")
        .setColor("BLURPLE")

        const components = [
            new MessageActionRow()
            .addComponents(
              new MessageSelectMenu()
               .setCustomId("reaction-roles")
               .setMaxValues(1)
               .addOptions(options)
            )
        ]

        interaction.reply({ embeds: [pannelEmbed], components })
    }
}