/*
###################################################################################################################
#                                           Importing All Modules And Packages Required                           #
###################################################################################################################
*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const chalk = require("chalk");
const discord = require("discord.js");
let port = 3000;
const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");
const fs = require("node:fs")
require("./Auth/discord")
const authRoute = require("./Auth/authv2")
require("./API/api")
const global = require("./Bot/Configs/staticClient.json")
const mongoose = require("mongoose");
const { isSpam } = require("./Events/isSpam")
const warnModel = require("./Bot/models/warn");
const { ready } = require("./Bot/Classes/readyClass")
const { activityPresenceManager } = require("./Bot/Classes/ActivityPrecenceManger")
/*
###################################################################################################################
#                                           CLIENT INSTALLER                                                      #
###################################################################################################################
*/
const client = new discord.Client({ intents: global.discordjs.clientIntents });
module.exports = {client};

/*
###################################################################################################################
#                                           Global Commands & Client Misc                                         #
###################################################################################################################
*/
client.commands = new discord.Collection();
client.invite = "https://discord.com/api/oauth2/authorize?client_id=1106304001026293882&permissions=46015708528118&scope=bot%20applications.commands";
client.prefix = `!!`;
client.nsfw = true;
client.perms = ["ADMINISTRATOR"];
client.globalConfig = []
/*
###################################################################################################################
#                                           Mongoose DB Connection                                                #
###################################################################################################################
*/

if (!global.API.mongo) return;
console.log(chalk.default.yellow(`⚠ | Loading MongoDB Using ${global.API.mongo}`))
mongoose.connect(global.API.mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log(chalk.default.green(`✅ | Loaded MongoDB Using ${global.API.mongo}`))).catch(err => {
    console.log(chalk.default.red(err.message))
});

/*
###################################################################################################################
#                                           Connection To Web DB                                                  #
###################################################################################################################
*/

const db = knex({
    client: global.db.client,
    connection: {
        host: global.db.host,
        user: global.db.user,
        password: global.db.password,
        database: global.db.database
    }
})

/*
###################################################################################################################
#                                           DISCORD MUSIC PLAYER                                                  #
###################################################################################################################
*/
const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
});
client.player = player


console.log(chalk.default.cyanBright(`${chalk.default.bold("                                            Project Made By Serpent#9740!")}`))


/*
###################################################################################################################
#                                           Instilizing App                                                       #
###################################################################################################################
*/

const app = express();

let intialPath = path.join(__dirname, "public");


/*
###################################################################################################################
#                                           Adding Paths                                                          #
###################################################################################################################
*/

app.use(bodyParser.json());
app.use(express.static(intialPath));
app.use(express.static(path.join(__dirname, "dashboard")));
app.use(express.static(path.join(__dirname, "dashboard", "Public")));
app.use(express.static(path.join(__dirname, "dashboard", "Public", "CSS")));
app.use(express.static(path.join(__dirname, "dashboard", "Public", "JavaScript")));
app.use(express.static(path.join(__dirname, "dashboard", "Public", "Files")));
app.set("view engine", "ejs");


/*
###################################################################################################################
#                                           Starting All URI Events                                               #
###################################################################################################################
*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./dashboard/dashboard.html"))
    //File(path.join(__dirname, "public", "login.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            console.log(res.json());
            res.json(data[0])
        })
        .catch(err => {
           // res.json(`Error: ${err.message}`)
        })
    }
})

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            console.log(res.json());
            data[0]
            //res.send("/dashboard/data")
        } else{
            res.json('email or password is incorrect');
        }

    })
})

app.get("/api", (req, res) => {
    res.status(200).sendFile(
        path.join(__dirname, "./API/api.html")
    )
})


const { getCommands } = require("./Utils/commands")
app.get("/dashboard" + "/data", async (req, res) => {
    res.sendFile(path.join(__dirname, "./dashboard/dashboard.html"))
})
app.get("/dashboard" + "/pages" + "/features", (req, res) => {
    res.sendFile(path.join(__dirname, "./dashboard/Public/Files/Features.html"))
})
app.get("/dashboard" + "/pages" + "/invite", (req, res) => {
    res.sendFile(path.join(__dirname, "./dashboard/Public/Files/invite.html"))
})
app.get("/dashboard" + "/pages" + "/rewards", (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands', { commands })
})

app.use("/api/v1/auth", authRoute);


/*
###################################################################################################################
#                                           Discord Bot                                                           #
###################################################################################################################
*/


const commandsPath = path.join(__dirname, "Bot", "SlashCommands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));



for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if(file.length === 0) continue;
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        console.log(chalk.default.green(`✅ | Command Loaded ${command.data.name}.js`));
    } else {
        console.log(chalk.default.red(`:x: | Command Failed ${command.data.name}.js`));
    }
}

// Checks For Spam

// client.on("message", async (message) => {
//     if(message.author.bot) return;
//     if(isSpam(message)) {
//         new warnModel({
//             userId: message.author.id,
//             GuildId: message.guild.id,
//             reason: "Spam",
//             ModId: client.user.id,
//             timeStamp: Date.now(),
//         }).save();

//         message.reply({ content: `You Have Been Warned By Auto Mod!` });
//     }
// });

client.on("interactionCreate", async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(chalk.default.red(`No Command Matching ${interaction.commandName} Was Found.`));
        return;
    }


    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err.message);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }

    // if(interaction.isSelectMenu()) {
        
    //     const roleId = interaction.values[0];
    //     const role = interaction.guild.roles.cache.get(roleId);
    //     const memberRoles = interaction.member.roles;

    //     const hasRole = memberRoles.cache.has(roleId);

    //     if(hasRole) {
    //        memberRoles.remove(roleId);
    //        interaction.update({ content: `${role.name} Has Been Removed From You!`, ephemeral: true })
    //     } else {
    //         memberRoles.add(roleId);
    //         interaction.update({ content: `I Have Given ${role.name} To You!`, ephemeral: true })
    //     }
    // }
})

const commands = [];

for (const file of commandFiles) {
    const command = require(`./Bot/SlashCommands/${file}`);
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(global.Client.clientToken);

(async () => {
    try {
        console.log(chalk.default.yellow("Started Loading Commands..."));

        const data = await rest.put(
            Routes.applicationCommands(global.Client.clientid),
            {
                body: commands
            },
        )

        console.log(chalk.default.green("Loaded All Commands!"))
    } catch (err) {
        console.log(err.message);
    }
})();


/*
###################################################################################################################
#                                           Loading App And Discord Bot                                           #
###################################################################################################################
*/


app.listen(port, (req, res) => {
    console.log(chalk.default.yellow("Loading All Modules & Packages..."));
    client.login(global.Client.clientToken);
    client.on("ready", async () => {
        client.user.setActivity(global.discordjs.statusText, );
        client.user.setPresence({ status: global.discordjs.statusBar })
        //new activityPresenceManager(global.discordjs.statusText, "WATCHING", global.discordjs.statusBar)
        new ready()
    })
    console.log(chalk.default.yellowBright(`Loaded Website On LocalHost:${port}!`));
    console.log(chalk.default.green(`All Modules & Packages Are Ready To Go!`))
})