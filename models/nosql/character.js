const mongoose = require('mongoose');

const CharacterScheme = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        description:{
            type: String
        },
        animeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'animes',
            required: true
        },
    }, {
        versionKey: false
    }
);
module.exports = mongoose.model("character", CharacterScheme)