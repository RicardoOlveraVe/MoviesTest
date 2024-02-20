const request = require("supertest")
const app = require("../app")

const URL_ACTOR = '/actors'

const actor = {
    firstName: "Tom",
    lastName: "Holand",
    nationality: "England",
    image: "asdkjsxansxsxmsakmdjnckjzn",
    birthday: "27-07-1987",
}

let actorId;

test("Post -> 'URL_ACTOR', should return status code 201, and res.body to be defined and res.body.image = actor.image", async () => {

    const res = await request(app)
        .post(URL_ACTOR)
        .send(actor)

    actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.image).toBe(actor.image);
})

test("Get -> 'URL_ACTOR', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
        .get(URL_ACTOR)
    
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)
})

test ("Get -> 'URL_ACTOR/:id', should return status code 200, res.body to be defined and res.body.image = actor.image", async () => {
    const res = await request(app)
        .get(`${URL_ACTOR}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.image).toBe(actor.image)
})

test("Put -> 'URL_ACTOR', should return status code 200, res.body to be defined", async () => {
    const res = await request(app)
        .put(`${URL_ACTOR}/${actorId}`)
        .send({nationality:"British"})

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.nationality).toBe("British")
})

test("Delete -> 'URL_ACTOR/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${URL_ACTOR}/${actorId}`)
    
    expect(res.statusCode).toBe(204)
})