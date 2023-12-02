const supertest  = require('supertest')
const app = require('../src/index')
const mongoose = require('mongoose');
const { findById } = require('../src/model/CommentModel');

beforeAll(async () => {
    // await mongoose.connect();
  
    // Set up any necessary setup before running tests
  }, 15000);
afterAll(async () => {
  // delete all collections
  await mongoose.disconnect();
});



describe('search keyword', () => {
    it('should return 200 for successfull while search', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const keyword = 'Indian';
        const res1 = await supertest(app)
            .get(`/search/searchpost/${keyword}`)
            .set('Cookie', cookies)
        
    
        expect(res1.statusCode).toEqual(200);

    
    })

});


describe('search username', () => {
    it('should return 404 for no users', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const username = 'gfd';
        const res1 = await supertest(app)
            .get(`/search/searchuser/${username}`)
            .set('Cookie', cookies)
        
    
        expect(res1.statusCode).toEqual(404);

    
    })

    it('should return 200 for succesfull search', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const keyword = 'Smeet Agrawal';
        const id = '655fcc8e1ed4ef8f6c65905f';
        const res1 = await supertest(app)
            .get(`/search/searchpost/${keyword}`)
            .set('Cookie', cookies)
        
    
        expect(res1.statusCode).toEqual(200);

    
    })

});