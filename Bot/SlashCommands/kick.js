const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a user from your server")
    .addUserOption(o => {
        return o.setName("target")
        .setDescription("the user you want to kick from the server")
        .setRequired(true)
    })
    .addStringOption(o => {
       return o.setName("reason")
        .setDescription("reason you want to kick this user")
        .setRequired(false)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.KICK_MEMBERS),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const user = interaction.guild.members.cache.get(target.id);
        const reason = interaction.options.getString("reason") || "No Reason Provided!";

        try {
            if(!user.kickable || user.id === client.user.id) return interaction.reply({ content: ":x: Can't kick This User!"})
            if(interaction.guild.members.cache.get(interaction.user.id).roles.highest.position > interaction.guild.members.cache.get(client.user.id).roles.highest.position) return interaction.reply({ content: "This Users Role Is Higher Than Mine So I Cannot Ban Them!" });
            await user.kick({ reason });
            let SentEmbed = new MessageEmbed()
            .setAuthor("You Have Been Kicked!", client.user.displayAvatarURL())
            .setDescription(`You Have Been Kicked From ${interaction.guild.name} For ${reason}`)
            .setColor("RED")

            try {
                await user.send({ embeds: [SentEmbed]}).catch(err => { console.log("COULD NOT DM USER Kick COMMAND")})

            } catch (err)
            {
                console.log("Cannot Dm User From Kick Command!")
            }
            let SuccessEmbed = new MessageEmbed()
            .setAuthor("User Has Been Kicked!", client.user.displayAvatarURL())
            .setDescription(`User Has Been Kicked From ${interaction.guild.name} For ${reason}`)
            .setColor("GREEN")

            interaction.reply({ embeds: [SuccessEmbed] });
        } catch (err) {
            let ErrorEmbed = new MessageEmbed()
            .setAuthor("Hmmm Looks Like There Is A Error!", client.user.displayAvatarURL())
            .setDescription(`**Error:\n\`\`\`js\n${err.message}\`\`\`**`)
            .setColor("RED")

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}