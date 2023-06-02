const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("mass delete messages from a channel")
    .addNumberOption(o => {
        return o.setName("amount")
        .setDescription("the amount of messages you want to delete from a channel")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(Permissions.FLAGS.MANAGE_CHANNELS),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    async execute(interaction) {
        const amount = interaction.options.getNumber("amount");
        
        try {
            if(amount <= 100)
            {
                interaction.channel.bulkDelete(amount, true);

                let SuccessEmbed = new MessageEmbed()
                .setAuthor("Channel Purge", client.user.displayAvatarURL())
                .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                .setColor("GREEN")
    
                return interaction.reply({ embeds: [SuccessEmbed] });
            } else if(amount <= 200) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 100;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 300) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 200;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 400) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 300;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 500) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 400;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 600) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 500;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 700) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 600;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 800) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 700;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 900) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 800;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else if(amount <= 1000) {
                interaction.channel.bulkDelete(100, true)
                let left = amount - 900;
                setTimeout(async () => {
                    interaction.channel.bulkDelete(left, true)
                    let SuccessEmbed = new MessageEmbed()
                    .setAuthor("Channel Purge", client.user.displayAvatarURL())
                    .setDescription(`You Have Purged ${amount} From ${interaction.channel.name}`)
                    .setColor("GREEN")
        
                    return interaction.reply({ embeds: [SuccessEmbed] });
                }, 2000)
            } else {
                let ErrorEmbed = new MessageEmbed()
                .setAuthor("Hmmm Looks Like There Is A Error!", client.user.displayAvatarURL())
                .setDescription(`**Error:\n\`\`\`js\nCannot Delete More Than 1000 Messages In One Bulk Delete!\`\`\`**`)
                .setColor("RED")
    
                interaction.reply({ embeds: [ErrorEmbed] })
            }


        } catch (err) {
            let ErrorEmbed = new MessageEmbed()
            .setAuthor("Hmmm Looks Like There Is A Error!", client.user.displayAvatarURL())
            .setDescription(`**Error:\n\`\`\`js\n${err.message}\`\`\`**`)
            .setColor("RED")

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}