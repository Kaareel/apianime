
const mongoose = require('mongoose');

const AnimeScheme = new mongoose.Schema(
    {
        titulo:{
            type: String
        },
        fechaEstreno:{
            type: String

        },
        charactersId: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'character' }]
        }
    }, 
    {
        versionKey: false,
    }
);
module.exports = mongoose.model("animes", AnimeScheme)