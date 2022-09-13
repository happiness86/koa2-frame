// const request = require('supertest')

// describe('POST /v1/contact', () => {
//   let server;
//   beforeAll(() => {
//     server = require('../../../app.js')
//   })

//   afterAll((done) => {
//     if (server) {
//       server.close(done)
//     }
//   })
//   it('插入成功', async () => {
//     const res = await request(server)
//       .post('/v1/contact')
//       .send({
//         "username": "test",
//         "phone": "1222222222222",
//         "company": "test",
//         "cooperationType": 1,
//         "email": "test@test.com",
//         "other": "otherfsfsdf",
//         "requestInfo": "from nginx"
//     })
//     expect(res.status).toBe(200)
//     expect(res.body.code).toBe(200)
//   })
// })
