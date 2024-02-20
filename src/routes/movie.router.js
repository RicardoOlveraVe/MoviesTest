const { getAll, create, update, remove, getOne, setGenresToMovies, setActorsToMovie, setDirectorsToMovie } = require('../controllers/movie.controller');	
const express = require('express');
				
const routerMovie = express.Router();

    routerMovie.route('/')
        .get(getAll)
        .post(create)

    routerMovie.route('/:id/genres')
        .post(setGenresToMovies)

    routerMovie.route('/:id/actors')
        .post(setActorsToMovie)

    routerMovie.route('/:id/directors')
        .post(setDirectorsToMovie)
    routerMovie.route('/:id')
        .get(getOne)
        .delete(remove)
        .put(update)

module.exports = routerMovie;