require('../models')

const request = require("supertest")
const app = require('../app')

const URL_MOVIE = '/movies'

const movie = {
    name: "Spider-Man",
    image: "ascaccdecscsdcsdc",
    synopsis: "lorem20",
    releaseYear: "05-09-2022"
}

let movieId

test("Post -> 'URL_MOVIE', should return status code 201, and res.body to be defined and res.body.name = movie.name", async () => {
    const res = await request(app)
        .post(URL_MOVIE)
        .send(movie)

    movieId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Get -> 'URL_MOVIE', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_MOVIE)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test ("Get -> 'URL_MOVIE/:id', should return status code 200, res.body to be defined and res.body.name = genre.name", async () => {
    const res = await request(app)
        .get(`${URL_MOVIE}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Put -> 'URL_MOVIE', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
        .put(`${URL_MOVIE}/${movieId}`)
        .send({name:"Spider-Man: No way home"})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Spider-Man: No way home")
})

test("Delete -> 'URL_MOVIE/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_MOVIE}/${movieId}`)
    
    expect(res.statusCode).toBe(204)
})