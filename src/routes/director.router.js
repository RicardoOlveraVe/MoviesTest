const { getAll, create, update, remove, getOne } = require('../controllers/director.controller');	
const express = require('express');
				
const routerDirector = express.Router();

    routerDirector.route('/')
        .get(getAll)
        .post(create)
    
    routerDirector.route('/:id')
        .get(getOne)
        .delete(remove)
        .put(update)

module.exports = routerDirector;