const supertest = require('supertest');
const app = require('../src/index');
const validateToken = require('../src/middleware/validateToken');
const User = require('../src/model/UserModel');
const Post = require('../src/model/PostModel');
const mongoose = require('mongoose');

beforeAll(async () => {
  // await mongoose.connect();

  // Set up any necessary setup before running tests
}, 15000);
afterAll(async () => {
  // delete all collections
  await mongoose.disconnect();
});

describe("CreatePost", () => {

  // Post

  it('should return 400 if title or content is missing in post', async () => {
    const user = {
      email: "202101237@daiict.ac.in",
      password: "smeet12345"
    };

    const res = await supertest(app)
      .post('/user/login')
      .send(user);
    
    const post = {};

    // Use 'set-cookie' instead of 'cookies'
    const cookies = res.headers['set-cookie'];

    const res1 = await supertest(app)
      .post('/post/createpost')
      .set('Cookie', cookies)
      .send(post);

    console.log(res1.body);
    expect(res1.statusCode).toEqual(400);
    expect(res1.body.error).toEqual("All Fields are mandatory");
  });


  it('should return 200 on succesful post upload', async () => {
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

      console.log(res1.body);
      expect(res1.statusCode).toEqual(201);
      expect(res1.body.message).toEqual("Post Uploaded Successfully");
  });

})

//postcomment

describe('postcomment',()=>{
  it('it should return an error if comment is not addded',async()=>{
    const user = {
      email: "202101237@daiict.ac.in",
      password: "smeet12345"
    };

    const res = await supertest(app)
      .post('/user/login')
      .send(user);

      const cookies = res.headers['set-cookie'];
      const comment = {comment:"Comment testing"};
      const id = '655d29d9a8ab70e961846352';
      const res1 = await supertest(app)
      .post(`/post/CreateComment/:${id}`)
      .set('Cookie', cookies)
      .send({});

      expect(res1.statusCode).toEqual(400);
      expect(res1.body.error).toEqual( "All fields are mandatory");   

  })

  it('it should return an error if comment is not addded',async()=>{
    const user = {
      email: "202101237@daiict.ac.in",
      password: "smeet12345"
    };
    
    const res = await supertest(app)
      .post('/user/login')
      .send(user);

      const cookies = res.headers['set-cookie'];
      const comment = {comment:"Comment testing"};
      const id = '655d29d9a8ab70e961846352';
      const res1 = await supertest(app)
      .post(`/post/CreateComment/${id}`)
      .set('Cookie', cookies)
      .send(comment);

      expect(res1.statusCode).toEqual(200);
      expect(res1.body.message).toEqual( "Comment Added Succesfully");   

  })

  it('it should return an error if url is not properly defined',async()=>{
    const user = {
      email: "202101237@daiict.ac.in",
      password: "smeet12345"
    };
    
    const res = await supertest(app)
      .post('/user/login')
      .send(user);

      const cookies = res.headers['set-cookie'];
      const comment = {comment:"Comment testing"};
      const id = '655d29d9a8ab70e961846352';
      const res1 = await supertest(app)
      .post(`/post/CreateComment/:${id}`)
      .set('Cookie', cookies)
      .send(comment);

      expect(res1.statusCode).toEqual(500);
      expect(res1.body.error).toEqual( "Internal Server Error");   

  })




})




