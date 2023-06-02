const { client } = require("../../server")
const chalk = require("chalk");


class activityPresenceManager {
    constructor (activity, activity_type, presence) {
        console.log(chalk.default.yellow(`[ActivityAndPresenceManager] Loading Activity And Presence...`))
        client.user.setActivity(activity, { type: activity_type });
        client.user.presence({ status: presence})
        console.log(chalk.default.greenBright(`[ActivityAndPresenceManager] Loaded Activity And Presence!`))
    }
}

module.exports = { activityPresenceManager }