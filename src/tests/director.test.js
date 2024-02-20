require('../models')

const request = require("supertest")
const app = require("../app")

const URL_DIRECTOR = '/directors'

const director = {
    firstName: "Guy",
    lastName: "Ritchie",
    nationality: "British",
    image: "dfdsfscsvdgvsds",
    birthday: "27-07-1987"
}

let directorId;

test("Post -> 'URL_DIRECTOR', should return status code 201, and res.body to be defined and res.body.image = director.image", async () => {

    const res = await request(app)
        .post(URL_DIRECTOR)
        .send(director)

    directorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.image).toBe(director.image);
})

test("Get -> 'URL_DIRECTOR', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_DIRECTOR)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test ("Get -> 'URL_DIRECTOR/:id', should return status code 200, res.body to be defined and res.body.image = director.image", async () => {
    const res = await request(app)
        .get(`${URL_DIRECTOR}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.image).toBe(director.image)
})

test("Put -> 'URL_DIRECTOR', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
        .put(`${URL_DIRECTOR}/${directorId}`)
        .send({nationality:"English"})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.nationality).toBe("English")
})

test("Delete -> 'URL_DIRECTOR/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_DIRECTOR}/${directorId}`)
    
    expect(res.statusCode).toBe(204)
})