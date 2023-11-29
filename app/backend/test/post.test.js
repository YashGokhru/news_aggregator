const supertest = require('supertest');
const app = require('../src/index');
const validateToken = require('../src/middleware/validateToken');
const User = require('../src/model/UserModel');
const Post = require('../src/model/PostModel');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Set up any necessary setup before running tests
}, 10000);
afterAll(async () => {
  // delete all collections
  await mongoose.disconnect();
});

// describe("CreatePost", () => {

//   // Post

//   it('should return 400 if title or content is missing in post', async () => {
//     const user = {
//       email: "202101266@daiict.ac.in",
//       password: "123456"
//     };

//     const res = await supertest(app)
//       .post('/user/login')
//       .send(user);
    
//     const post = {};

//     // Use 'set-cookie' instead of 'cookies'
//     const cookies = res.headers['set-cookie'];

//     const res1 = await supertest(app)
//       .post('/post/createpost')
//       .set('Cookie', cookies)
//       .send(post);

//     console.log(res1.body);
//     expect(res1.statusCode).toEqual(400);
//     expect(res1.body.error).toEqual("All Fields are mandatory");
//   });


//   it('should return 200 on succesful post upload', async () => {
//     const user = {
//       email: "202101266@daiict.ac.in",
//       password: "123456"
//     };

//     const res = await supertest(app)
//       .post('/user/login')
//       .send(user);
    
//     const post = {title:"Testing",content:"Unit testing of CreatePost"};

//     // Use 'set-cookie' instead of 'cookies'
//     const cookies = res.headers['set-cookie'];

//     const res1 = await supertest(app)
//       .post('/post/createpost')
//       .set('Cookie', cookies)
//       .send(post);

//       console.log(res1.body);
//       expect(res1.statusCode).toEqual(201);
//       expect(res1.body.message).toEqual("Post Uploaded Successfully");
//   });

//get post

describe("GetPost",()=>{

  
      it('should return 200 on succesful login', async () => {
    const user = {
      email: "202101266@daiict.ac.in",
      password: "123456"
    };

    const res = await supertest(app)
      .post('/user/login')
      .send(user);
    
    const post = {title:"Testing",content:"Unit testing of CreatePost"};

    // Use 'set-cookie' instead of 'cookies'
    const cookies = res.headers['set-cookie'];

    const res1 = await supertest(app)
      .post('/post/createpost')
      .set('Cookie', cookies)
      .send(post);

      const res2 = await supertest(app)
      .post('/post/getpost')
      .set('Cookie', cookies)
      console.log(res2.body);
      expect(res2.statusCode).toEqual(200);
      
      
  });

  });



// });

//Post Comment

// describe("PostComment",()=>{

  
//   it('should return 400 if title or content is missing in postcomment', async () => {
//     const user = {
//       email: "202101266@daiict.ac.in",
//       password: "123456"
//     };

//     const res = await supertest(app)
//       .post('/user/login')
//       .send(user);
    
//     const post = {title:"Testing",content:"Unit testing of CreatePost"};

//     // Use 'set-cookie' instead of 'cookies'
//     const cookies = res.headers['set-cookie'];

//     const res1 = await supertest(app)
//       .post('/post/createpost')
//       .set('Cookie', cookies)
//       .send(post);
//       const postId = res1.body._id;

//       // const comment = {comment:"Unit testing of CreateComment"};
//       const comment = {};
//       const res2 = await supertest(app)
//       .post(`/post/CreateComment/${postId}`)
//       .send(comment)
//       .set('Cookie', cookies);
//       console.log(res2.body);
//       expect(res2.statusCode).toEqual(400);
//       expect(res2.body.error).toEqual("All fields are mandatory");

//   });

//   it('should return 200 on successfully comment on post', async () => {
//     const user = {
//       email: "202101266@daiict.ac.in",
//       password: "123456"
//     };

//     const res = await supertest(app)
//       .post('/user/login')
//       .send(user);
    
//     const post = {title:"Testing",content:"Unit testing of CreatePost"};

//     // Use 'set-cookie' instead of 'cookies'
//     const cookies = res.headers['set-cookie'];

//     const res1 = await supertest(app)
//       .post('/post/createpost')
//       .set('Cookie', cookies)
//       .send(post);
//       const PostId = res1.body._id;
//       console.log("postid:",PostId);

//       const comment = {comment:"Unit testing of CreateComment"};
//       console.log("Comment",comment);
//       // const comment = {};
//       const res2 = await supertest(app)
//       .post(`/post/CreateComment/${PostId}`)
//       .send(comment)
//       .set('Cookie', cookies);
//       console.log(res2.body);
//       expect(res2.statusCode).toEqual(200);
//       expect(res2.body.message).toEqual("Comment Uploaded Successfully");
//   });
// 
// 
  // });




