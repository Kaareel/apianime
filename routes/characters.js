const express = require('express')
const router = express.Router();
const { getItems, createItems, updateItems, deleteItems } = require('../controllers/characters')

const path = 'character'

router.get(`/${path}`, getItems);

router.post(`/${path}`, createItems);

router.put(`/${path}/:id`, updateItems);

router.delete(`/${path}/:id`, deleteItems);



module.exports = router;
