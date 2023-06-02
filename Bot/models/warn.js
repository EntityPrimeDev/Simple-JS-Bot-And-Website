const mongoose = require("mongoose");

module.exports = mongoose.model('warnings', new mongoose.Schema({ 
    userId: String,
    GuildId: String,
    reason: String,
    ModId: String,
    timeStamp: Number
}))