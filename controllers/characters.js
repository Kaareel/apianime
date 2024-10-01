const { characterModel, animesModel } = require('../models');
const mongoose = require('mongoose');

const parseId = (id) => {
    return mongoose.Types.ObjectId.createFromHexString(id);
}

const getItems = async (req, res) =>{
    const data = await characterModel.find()

    res.send(data); 
}
const createItems = async (req, res) => {
    try {
        const { name, description, animeId } = req.body;
        console.log({animeId});

        if (!mongoose.Types.ObjectId.isValid(animeId)) {
            return res.status(400).send({ message: 'Invalid anime ID.' });
        }
        const objectAnimeId = mongoose.Types.ObjectId.createFromHexString(animeId);
        console.log("objectId", objectAnimeId)

        const newCharacter = await characterModel.create({name, description, animeId: objectAnimeId});
        console.log("newCharacter", newCharacter)
        
        const result = await animesModel.findByIdAndUpdate(
            objectAnimeId, 
            { $push: { charactersId: newCharacter._id } },
            { new: true }  
        );

        if (!result) {
           return res.send({ message: 'Anime not found.'});
        }
        res.send({ message: 'Character created and added to anime successfully', newCharacter, result });
    } catch (error) {
        res.status(500).send({ message: 'Error adding the character.', error });
    }

};

const updateItems = async (req, res) => {
    try{
        const { id } = req.params
        const body = req.body;
        const result = await characterModel.updateOne({ _id: parseId(id) }, body);
        if(result.matchedCount === 0){
            return res.status(404).send({ message: 'Character not found for update.' });
        }
        if (result.modifiedCount === 0) {
            return res.status(200).send({ message: 'No changes made to the character.' });
        }
        res.send({ message: 'Character updated successfully.' });

    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).send({ error: 'Error updating the item.' });
    }
    
};

const deleteItems = async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await characterModel.deleteOne({ _id: parseId(id) });
        if(result.deletedCount === 0){
            return res.status(404).send({ message: 'Character not found for deletion.' });
        }
        res.send({ message: 'Character deleted successfully.' });
} catch(e) {
    console.error("Error deleting item:", e);
    res.status(500).send({ error: 'Error deleting the item.' });
}
}

module.exports = { getItems, createItems, updateItems, deleteItems}