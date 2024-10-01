const { animesModel } = require('../models');
const mongoose = require('mongoose');

const parseId = (id) => {
    return mongoose.Types.ObjectId.createFromHexString(id);
}

const getItems = async (req, res) =>{
    const data = await animesModel.find()

    res.send(data); 
}
const createItems = async (req, res) => {
    try {
        const { titulo, fechaEstreno } = req.body;
        const newItem = { titulo, fechaEstreno };
        console.log({newItem});

        const data = await animesModel.create(newItem);
        

        res.send({ data });
    } catch (error) {
        console.error("Error al crear item:", error);
        res.status(500).send({ error: 'Error al crear el item' });
    }

};

const updateItems = async (req, res) => {
    try{
        const { id } = req.params
        const body = req.body;
        const result = await animesModel.updateOne({ _id: parseId(id) }, body);
        if(result.matchedCount === 0){
            return res.status(404).send({ message: 'el anime no se encontro para actualizar' });
        }
        if (result.modifiedCount === 0) {
            return res.status(200).send({ message: 'no hubo cambios en el anime' });
        }
        res.send({ message: 'anime actualizado correctamente' });

    } catch (error) {
        console.error("Error al actualizar item:", error);
        res.status(500).send({ error: 'Error al actualizar el item' });
    }
    
};

const deleteItems = async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await animesModel.deleteOne({ _id: parseId(id) });
        console.log("result", result);
        if(result.deletedCount === 0){
            return res.status(404).send({ message: 'El anime no se encontro para eliminar' });
        }
        res.send({ message: 'anime eliminado correctamente' });
} catch(e) {
    console.error("Error al eliminar item:", e);
    res.status(500).send({ error: 'Error al eliminar el item' });
}
}

module.exports = { getItems, createItems, updateItems, deleteItems}