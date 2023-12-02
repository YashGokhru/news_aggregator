const supertest = require('supertest');
const app = require('../src/index');
const validateToken = require('../src/middleware/validateToken');
const User = require('../src/model/UserModel');
const Post = require('../src/model/PostModel');
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



describe('NestedComment', () => {
    it('should return 400 if comment is empty', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
    
        const cookies = res.headers['set-cookie'];
        const comment = { comment: "" };
        const id = '655d9ab7fb51c568261b46d5';
        const res1 = await supertest(app)
            .post(`/comments/replytocomment/${id}`)
            .set('Cookie', cookies)
            .send(comment);
    
        expect(res1.statusCode).toEqual(400);
        expect(res1.body.error).toEqual("All fields are mandatory");
    
    })
    
    it('should return 200 and object comment if comment succesfull ', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
            
            const cookies = res.headers['set-cookie'];
            const comment = { comment: "Nested Comment testing" };
            const id = '655d9ab7fb51c568261b46d5';
            const res1 = await supertest(app)
            .post(`/comments/replytocomment/${id}`)
            .set('Cookie', cookies)
            .send(comment);
    
        expect(res1.statusCode).toEqual(200);
        expect(res1.body.message).toEqual("Comment Added Succesfully");
        expect(res1.body.content).toEqual("Nested Comment testing");
        expect(res1.body.username).toEqual("Smeet Agrawal");
        // expect(res1.body._id).toEqual("1");
    
    })

    it('should return 500 internal error for error', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
            
            const cookies = res.headers['set-cookie'];
            const comment = { comment: "Nested Comment testing" };
            const id = '655d9ab7fb51c568261b46d5';
            const res1 = await supertest(app)
            .post(`/comments/replytocomment/:${id}`)
            .set('Cookie', cookies)
            .send(comment);
    
        expect(res1.statusCode).toEqual(500);
        expect(res1.body.error).toEqual("Internal Server Error");
       
        
    
    })

    it('should return 500 internal error for error', async () => {
        const user = {
            email: "202101237@daiict.ac.in",
            password: "smeet12345"
        };
    
        const res = await supertest(app)
            .post('/user/login')
            .send(user);
            
            const cookies = res.headers['set-cookie'];
            const comment = { comment: "Nested Comment testing" };
            const id = '655d9ab7fb51c568261b5';
            const res1 = await supertest(app)
            .post(`/comments/replytocomment/:${id}`)
            .set('Cookie', cookies)
            .send(comment);
    
        expect(res1.statusCode).toEqual(500);
        expect(res1.body.error).toEqual("Internal Server Error");
       
        
    
    })
  


});

// describe("showreplies",()=>{
//     it('it should',async()=>{
//         const user = {
//             email: "202101237@daiict.ac.in",
//             password: "smeet12345"
//         };
    
//         const res = await supertest(app)
//             .post('/user/login')
//             .send(user);
            
//             const cookies = res.headers['set-cookie'];
//             const id = '655d9ab7fb51c568261b46d5';
//             const res1 = await supertest(app)
//             .post(`/comments/showreplies/:${id}`)
//             .set('Cookie', cookies)
            
    
//         expect(res1.statusCode).toEqual(200);
//         // expect(res1.body.error).toEqual("Internal Server Error");
//     })
// })

