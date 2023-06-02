const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    Guild: String,
    Channel1: String,
});

module.exports = mongoose.model("welcomeandgoodbye", Schema);