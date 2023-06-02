const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder  } = require("@discordjs/builders");
const { MessageEmbed, Permissions, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const { client } = require("../../server");
const package = require('../../package.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Tells You The Commands Of The Bot"),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(interaction) {
        const embed = new MessageEmbed()
        .setAuthor(`Serpent's Help Command`)
        .setDescription(`Please Click The Buttons To View The Commands!`)
        .setFooter(`Bot Made By: ${package.author}`)
        .setColor("BLURPLE")
        

        const buttons_row1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("home")
            .setLabel("Home")
            .setEmoji("<:vsl_home:1076832592176885852>")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setCustomId("mod")
            .setLabel("Moderation")
            .setEmoji("<a:9005abanhammer:1074663165968797696>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("fun")
            .setLabel("Fun")
            .setEmoji("<:2433icant:1076618424194703401>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("rr")
            .setLabel("Reaction Roles")
            .setEmoji("<:reaction_role_3:1085260422464147516>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("music")
            .setLabel("Music")
            .setEmoji("<:Pink_music:1085260619726463028>")
            .setStyle("PRIMARY"),
        )
        const buttons_row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("info")
            .setLabel("General")
            .setEmoji("<:5566speechbubblewhat:1076618285539409951>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("config")
            .setLabel("Config")
            .setEmoji("<a:cog_gear_work:1076618977679265913>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("nsfw")
            .setLabel("NSFW")
            .setEmoji("1076828901759778956")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("web1")
            .setLabel("Website")
            .setEmoji("<:website:1085261425947185283>")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("rolem")
            .setLabel("Role Managment")
            .setEmoji("<:role_manager:1085261424852467853>")
            .setStyle("PRIMARY"),
        )


        await interaction.editReply({ embeds: [embed], components: [buttons_row1, buttons_row2]});


        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if(i.customId === "home") {
                await i.deferUpdate();
                await i.editReply({ embeds: [embed], components: [buttons_row1, buttons_row2]});
            }
            if(i.customId === "config") {
                await i.deferUpdate();
                let config_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Config Commands`)
                .setDescription(`Here Are A List Of All My Config Commands:`)
                .addFields({
                    name: "/setup-welcome-logs <#channel>",
                    value: "Says Welcome And Goodbye To Users In That Channel."
                }
                )
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.update({ embeds: [config_commands], components: [buttons_row1, buttons_row2]})
            }
            if(i.customId === "mod") {
                await i.deferReply();
                let warn_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Moderation Commands`)
                .setDescription(`Here Are A List Of All My Moderation Commands:`)
                .addFields(
                {
                    name: "/warn <@user> <reason>",
                    value: "Warn A User For A Reason."
                }, 
                {
                    name: "/show-warnings <@user>",
                    value: "Shows The Users Warnings,"
                },
                {
                    name: "/delete-warning <warnid>",
                    value: "Delete A Users Warning"
                },
                {
                    name: "/ban <@user> <reason>",
                    value: "Bans A Member From The Server."
                },
                {
                    name: "/kick <@user> <reason>",
                    value: "Kick A User From The Server."
                },
                {
                    name: "/purge <amount>",
                    value: "Mass Delete Messages From A Channel."
                },
                {
                    name: "/mute <@user> <time>",
                    value: "Temp Mute A User."
                },
                )
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [warn_commands], components: [buttons_row1, buttons_row2]})
            }
            if(i.customId === "fun") {
                await i.deferUpdate();
                let fun_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Fun Commands`)
                .setDescription(`Here Are A List Of All My Fun Commands:`)
                .addFields(
                {
                    name: "/meme",
                    value: "Gives You A Random Meme."
                }, 
                {
                    name: "/gay-tracker",
                    value: "Tell You How Gay You Are."
                },
                {
                    name: "/furry",
                    value: "Tell You If You Are A Furry Or Not."
                },
                )
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [fun_commands], components: [buttons_row1, buttons_row2]})
            }
            if(i.customId === "info")
            {
                await i.deferUpdate();
                let info_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} General Commands`)
                .setDescription(`Here Are A List Of All My General Commands:`)
                .addFields(
                {
                    name: "/about",
                    value: "Tells You About The Bot."
                }, 
                {
                    name: "/server-info",
                    value: "Tell You About The Server You Ran It In."
                },
                {
                    name: "/help",
                    value: "Tells You All The Commands Of The Bot."
                },
                {
                    name: "/invite",
                    value: "Creates A Invite Link For The Bot."
                },
                {
                    name: "/membercount",
                    value: "Tells You The Current Member Count."
                },
                {
                    name: "/ping",
                    value: "Tells You The Bots Ping."
                },
                )
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [info_commands], components: [buttons_row1, buttons_row2]})
            }
            if(i.customId === "nsfw")
            {
                await i.deferUpdate();
                if(i.channel.nsfw)
                {
                    let nsfw_commands = new MessageEmbed()
                    .setAuthor(`${client.user.username} NSFW Commands`)
                    .setDescription(`Here Are A List Of All My NSFW Commands:`)
                    .addFields(
                    {
                        name: "/pussy",
                        value: "Displays A Picture Of A Random Pussy."
                    }, 
                    {
                        name: "/ass",
                        value: "Gives You A Picture Of A Random Ass."
                    },
                    {
                        name: "/boobs",
                        value: "Gives You Random Picture Of Boobs."
                    },
                    {
                        name: "/hentai",
                        value: "Gives You Random Hentai Pictures."
                    },
                    {
                        name: "/foxgirl",
                        value: "Gives You A Picture Of Fox Girl."
                    },
                    )
                    .setFooter(`Bot Made By: ${package.author}`)
                    .setColor("BLURPLE")
    
                    await i.editReply({ embeds: [nsfw_commands], components: [buttons_row1, buttons_row2]})
                } else {
                    await i.editReply({ content: `**:x: | Please Run This In A NSFW Only Channel.**`, components: [buttons_row1, buttons_row2] })
                }
            }
            if(i.customId === "music") 
            {
                await i.deferUpdate();
                
                let music_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Music Commands`)
                .setDescription(`Here Are A List Of All My Music Commands:`)
                .addFields(
                {
                    name: "/play <song>",
                    value: "Starts Playing The Requested Song."
                }, 
                {
                    name: "/stop",
                    value: "Stops The Current Queue."
                },
                {
                    name: "/skip",
                    value: "Skips The Current Song."
                },
                {
                    name: "/pause",
                    value: "Pauses The Current Song."
                },
                {
                    name: "/resume",
                    value: "Resumes The Current Song."
                }
                )
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [music_commands], components: [buttons_row1, buttons_row2]})            
            }
            if(i.customId === "rr") 
            {
                await i.deferUpdate();
                
                let rr_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Reaction Role Commands`)
                .setDescription(`Here Are A List Of All My Reaction Role Commands:`)
                .addFields(
                {
                    name: "/add-rr <@role> <description> <emoji>",
                    value: "Adds A Role To The Current Server RR's."
                }, 
                {
                    name: "/remove-rr <@role>",
                    value: "Removes A Role From Current RR's."
                },
                {
                    name: "/pannel",
                    value: "Displays And Lets Users Interact With A Reation Role Pannel."
                })
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [rr_commands], components: [buttons_row1, buttons_row2]})            
            }
            if(i.customId === "rolem") 
            {
                await i.deferUpdate();
                
                let rm_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Role Managment Commands`)
                .setDescription(`Here Are A List Of All My Role Managment Commands:`)
                .addFields(
                {
                    name: "/give-role <@role> <@user>",
                    value: "Adds A Role To The User."
                }, 
                {
                    name: "/remove-role <@role> <@user>",
                    value: "Removes A Role From The User."
                })
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [rm_commands], components: [buttons_row1, buttons_row2]})            
            }
            if(i.customId === "web1") 
            {
                await i.deferUpdate();
                
                let web_commands = new MessageEmbed()
                .setAuthor(`${client.user.username} Web Commands`)
                .setDescription(`Here Are A List Of All My Web Commands:`)
                .addFields(
                {
                    name: "/google <google>",
                    value: "Looks For Things On Google That You Searched Up."
                })
                .setFooter(`Bot Made By: ${package.author}`)
                .setColor("BLURPLE")

                await i.editReply({ embeds: [web_commands], components: [buttons_row1, buttons_row2]})            
            }
        });
        collector.on("end", async() => {
            await interaction.editReply({ content: "**Please Re-Run The Command.**"})
        })
    }
}


// const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder  } = require("@discordjs/builders");
// const { MessageEmbed, Permissions, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
// const { client } = require("../../server");
// const package = require('../../package.json')

// module.exports = {
//     data: new SlashCommandBuilder()
//     .setName("help")
//     .setDescription("Tells You The Commands Of The Bot"),

//     /**
//      *
//      * @param {Client} client
//      * @param {CommandInteraction} interaction
//      * @param {String[]} args
//      */

//     async execute(interaction) {
//         const cmd = client.commands.map((cmds) => {
//             let name = cmds.data.name;
//             let desc = cmds.data.description;
//             return `**/${name}:**\nDescription: ${desc}\n\n`;
//           });
        
//           const pages = [
//             new MessageEmbed()
//               .setAuthor(`Serpent's Help Command`)
//               .setDescription(`Page 1\n\n${cmd.slice(0, 10)}`)
//               .setFooter(`Bot Made By: ${package.author}`)
//               .setColor("BLURPLE"),
//             new MessageEmbed()
//               .setAuthor(`Serpent's Help Command`)
//               .setDescription(`Page 2\n\n${cmd.slice(10, 20)}`)
//               .setFooter(`Bot Made By: ${package.author}`)
//               .setColor("BLURPLE"),
//             new MessageEmbed()
//               .setAuthor(`Serpent's Help Command`)
//               .setDescription(`Page 3\n\n${cmd.slice(20)}`)
//               .setFooter(`Bot Made By: ${package.author}`)
//               .setColor("BLURPLE"),
//           ];
        
//           const buttons = [
//             new MessageButton()
//               .setCustomId('page1')
//               .setLabel('Page 1')
//               .setStyle('PRIMARY'),
//             new MessageButton()
//               .setCustomId('page2')
//               .setLabel('Page 2')
//               .setStyle('PRIMARY'),
//             new MessageButton()
//               .setCustomId('page3')
//               .setLabel('Page 3')
//               .setStyle('PRIMARY'),
//           ];
        
//           const rows = [
//             new MessageActionRow().addComponents(buttons),
//           ];
        
//           const message = await interaction.reply({
//             embeds: [pages[0]],
//             components: rows,
//             fetchReply: true,
//           });
        
//           const filter = (i) => i.customId.startsWith('page');
//           const collector = message.createMessageComponentCollector({ filter, time: 60000 });
        
//           collector.on('collect', (i) => {
//             const page = parseInt(i.customId.slice(4)) - 1;
//             i.update({ embeds: [pages[page]], components: rows });
//           });
        
//           collector.on('end', () => {
//             if (!message.deleted) {
//               message.edit({ components: [] });
//             }
//           });
//     }
// }