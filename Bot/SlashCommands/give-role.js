const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("give-role")
    .setDescription("give a user a role")
    .addUserOption(o => {
        return o.setName("user")
        .setDescription("the member to give the role too.")
        .setRequired(true)
    })
    .addRoleOption(o => {
        return o.setName("role")
        .setDescription("the role to give the member.")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_ROLES),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id);
        const role = interaction.options.getRole("role");
        
        if(interaction.guild.roles.cache.get(role.id).position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ content: "Looks Like This Role Is Above Mine! (Move It Higher!!!)"});
        if(interaction.guild.members.cache.get(interaction.user.id).roles.highest.position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ content: "This Users Role Is Higher Than Mine So I Cannot Give Them A Role!" });

        try {
            member.roles.add(role.id);
            let success = new MessageEmbed()
            .setAuthor("Role Given", client.user.displayAvatarURL())
            .setDescription(`Given ${member} The Role **${role.name}**`)
            .setColor("AQUA")

            interaction.reply({ embeds: [success] })
        } catch (err) {
            let errror = new MessageEmbed()
            .setAuthor("Error", client.user.displayAvatarURL())
            .setDescription(`Error Detected!\nError Message:\n\n\`\`\`js\n${err.message}\`\`\``)
            .setColor("RED")

            interaction.reply({ embeds: [errror]})
        }

    }
}