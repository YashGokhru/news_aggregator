const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/model/UserModel');
const bcrypt = require('bcrypt');
const connectDb = require('../src/config/DbConnection');
const mongoose = require('mongoose');
beforeAll(async () => {
    // await mongoose.connect();
  
    // Set up any necessary setup before running tests
  }, 15000);
afterAll(async () => {
  // delete all collections
  await mongoose.disconnect();
});

describe("loginHandler", () => {
    it('should return 400 if email or password is missing', async () => {
        const response = await supertest(app)
            .post('/user/register')
            .send({ "email": "202101237@daiict.ac.in" });
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({ error: 'All Fields are mandatory' });
    });
    it('should return 400 for already registered user', async () => {
        const response = await supertest(app)
            .post('/user/register')
            .send({
                "email": "202101237@daiict.ac.in",
                "name": "smeet",
                "password": "smeet12345"
            });

        expect(response.statusCode).toEqual(409);
        expect(response.body).toEqual({ error: "User already registered" });
    });

    it('should return 200 on succesfully registered', async () => {
        const response = await supertest(app)
            .post('/user/register')
            .send({
                "email": "202101222@daiict.ac.in",
                "name": "Priyesh",
                "password": "smeet12345"
            });

        expect(response.statusCode).toEqual(200);
        
    });



});