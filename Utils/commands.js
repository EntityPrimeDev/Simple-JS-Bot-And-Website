const path = require("node:path");
const fs = require("node:fs")
const client = require("../server")
function getCommands() {
    const commandsPath = path.join(__dirname, "..", "Bot", "SlashCommands");
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    const value = [];

    for(const file in commandFiles) {
        const command = require(`../Bot/SlashCommands/${file}`);

        return value.push({
            name: commands.data.name
        })


    } 
    return value;
}

module.exports = { getCommands };