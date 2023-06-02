const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
const ms = require("ms")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute a user")
    .addUserOption(o => {
        return o.setName("target")
        .setDescription("the member you want to mute")
        .setRequired(true)
    })
    .addStringOption(o => {
        return o.setName("time")
        .setDescription("the amount of time they should be muted for")
        .setRequired(true)
    })
    .addStringOption(o => {
        return o.setName("reason")
        .setDescription("reason for the mute")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.MUTE_MEMBERS),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const user = interaction.options.getUser("target");
        const member = interaction.guild.members.cache.get(user.id);
        const time = interaction.options.getString("time");
        const reason = interaction.options.getString("reason");

        const timeInMs = ms(time);

        if(!timeInMs) return interaction.reply({ content: "Please Give A Valid Amount Of Time!", ephemeral: true})
        try {
            member.timeout(timeInMs, reason);
            
            let sent = new MessageEmbed()
            .setTitle(`You Have Been Muted.`)
            .setDescription(`You Have Been Muted In ${interaction.guild.name} For ${reason}\nTime: ${time}`)
            .setColor("BLURPLE")

            await member.send({ embeds: [sent] }).catch(err => {
                console.log("COULD NOT DM USER MUTE COMMAND")
            })

            let success = new MessageEmbed()
            .setTitle(`You Have Muted ${member.user.username}.`)
            .setDescription(`You Have Muted ${member} For ${reason}\nTime: ${time}`)
            .setColor("BLURPLE")

            await interaction.reply({ embeds: [success]})
        } catch (err) {
            let ErrorEmbed = new MessageEmbed()
            .setAuthor("Hmmm Looks Like There Is A Error!", client.user.displayAvatarURL())
            .setDescription(`**Error:\n\`\`\`js\n${err.message}\`\`\`**`)
            .setColor("RED")

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}