const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const rrModel = require("../models/reactionroles");
const global = require("../Configs/staticClient.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-rr")
    .setDescription("add a reaction role")
    .addRoleOption(o => {
        return o.setName("role")
        .setDescription("the role to add to the rr pannel")
        .setRequired(true)
    })
    .addStringOption(o => {
        return o.setName("description")
        .setDescription("the description of the rr")
        .setRequired(false)
    })
    .addStringOption(o => {
        return o.setName("emoji")
        .setDescription("the emoji of the rr")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_ROLES),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        const roleDescription =
         interaction.options.getString('description') || null;
        const roleEmoji = interaction.options.getString("emoji") || null;

        
        let postionerror = new MessageEmbed().setColor("RED")
        .setDescription(`${global.emojis.error} | Please Move My Role Higher Than The One You Want To Make A Reaction Role!`)
        if(role.position >= interaction.guild.me.roles.highest.position) return interaction.reply ({ embeds: [postionerror] });

        const guildData = await rrModel.findOne({ guildId: interaction.guildId });

        const newRole = {
            roleId: role.id,
            roleDescription,
            roleEmoji,
        };

        if(guildData) {
            let roleData = guildData.roles.find((x) => x.roleId === role.id);

            if(roleData) {
                roleData = newRole;
            } else {
                guildData.roles = [...guildData.roles, newRole]
            }

            await guildData.save();
        } else {
            await rrModel.create({
                guildId: interaction.guildId,
                roles: newRole,
            });
        }

        let finish = new MessageEmbed().setColor("GREEN")
        .setTitle("New Reaction Role")
        .setDescription(`${global.emojis.success} | New Reaction Role Added To This Guilds Data!`)

        interaction.reply ({ embeds: [finish] })
    }
}