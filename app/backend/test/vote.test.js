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



describe('upvote', () => {
    it('should return 400 for empty vote', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const vote = {};
        const id = '655fcc8e1ed4ef8f6c65905f';
        const res1 = await supertest(app)
            .post(`/comments/vote/${id}`)
            .set('Cookie', cookies)
            .send(vote);
    
        expect(res1.statusCode).toEqual(400);
        // expect(res1.body.error).toEqual("Invalid Voting");
    
    })
    it('should return 200 for upvote', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const vote = { vote: 1 };
        const id = '655fcc8e1ed4ef8f6c65905f';
        const res1 = await supertest(app)
            .post(`/comments/vote/${id}`)
            .set('Cookie', cookies)
            .send(vote);
    
        expect(res1.statusCode).toEqual(200);
        
    
    })

    it('should return 200 for downvote', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const vote = { vote: -1 };
        const id = '655fcc8e1ed4ef8f6c65905f';
        const res1 = await supertest(app)
            .post(`/comments/vote/${id}`)
            .set('Cookie', cookies)
            .send(vote);
    
        expect(res1.statusCode).toEqual(200);
        
    
    })

    it('should return 200 ', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const vote = { vote: 0 };
        const id = '655fcc8e1ed4ef8f6c65905f';
        const res1 = await supertest(app)
            .post(`/comments/vote/${id}`)
            .set('Cookie', cookies)
            .send(vote);
    
        expect(res1.statusCode).toEqual(400);
        
    
    })

});


