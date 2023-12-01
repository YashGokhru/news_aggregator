const supertest = require('supertest');

const app = require("../src/index")

describe("home",()=>{
    it('it sholed ',async()=>{
        const user = {
                  email: "202101266@daiict.ac.in",
                  password: "123456"
                };
            
                const res = await supertest(app)
                  .post('/user/login')
                  .send(user);
                  
        const res1 = await supertest(app)
        .post('/home/posts')

    })
})



// describe("GetPost",()=>{

  
//     it('should return 200 on succesful login', async () => {
//   const user = {
//     email: "202101266@daiict.ac.in",
//     password: "123456"
//   };

//   const res = await supertest(app)
//     .post('/user/login')
//     .send(user);
  
//   const post = {title:"Testing",content:"Unit testing of CreatePost"};

//   // Use 'set-cookie' instead of 'cookies'
//   const cookies = res.headers['set-cookie'];

//   const res1 = await supertest(app)
//     .post('/post/createpost')
//     .set('Cookie', cookies)
//     .send(post);

//     const postId = res1.body.Post._id;
    

//     console.log(postId);


//     // const res2 = await supertest(app)
//     // .post('/home/post')
//     // .set('Cookie', cookies)
//     // console.log(res2.body);
//     // expect(res2.statusCode).toEqual(200);
    
    
// });

// });



// // });

// //Post Comment

// // describe("PostComment",()=>{


// //   it('should return 400 if title or content is missing in postcomment', async () => {
// //     const user = {
// //       email: "202101266@daiict.ac.in",
// //       password: "123456"
// //     };

// //     const res = await supertest(app)
// //       .post('/user/login')
// //       .send(user);
  
// //     const post = {title:"Testing",content:"Unit testing of CreatePost"};

// //     // Use 'set-cookie' instead of 'cookies'
// //     const cookies = res.headers['set-cookie'];

// //     const res1 = await supertest(app)
// //       .post('/post/createpost')
// //       .set('Cookie', cookies)
// //       .send(post);
// //       const postId = res1.body._id;

// //       // const comment = {comment:"Unit testing of CreateComment"};
// //       const comment = {};
// //       const res2 = await supertest(app)
// //       .post(`/post/CreateComment/${postId}`)
// //       .send(comment)
// //       .set('Cookie', cookies);
// //       console.log(res2.body);
// //       expect(res2.statusCode).toEqual(400);
// //       expect(res2.body.error).toEqual("All fields are mandatory");

// //   });

// //   it('should return 200 on successfully comment on post', async () => {
// //     const user = {
// //       email: "202101266@daiict.ac.in",
// //       password: "123456"
// //     };

// //     const res = await supertest(app)
// //       .post('/user/login')
// //       .send(user);
  
// //     const post = {title:"Testing",content:"Unit testing of CreatePost"};

// //     // Use 'set-cookie' instead of 'cookies'
// //     const cookies = res.headers['set-cookie'];

// //     const res1 = await supertest(app)
// //       .post('/post/createpost')
// //       .set('Cookie', cookies)
// //       .send(post);
// //       const PostId = res1.body._id;
// //       console.log("postid:",PostId);

// //       const comment = {comment:"Unit testing of CreateComment"};
// //       console.log("Comment",comment);
// //       // const comment = {};
// //       const res2 = await supertest(app)
// //       .post(`/post/CreateComment/${PostId}`)
// //       .send(comment)
// //       .set('Cookie', cookies);
// //       console.log(res2.body);
// //       expect(res2.statusCode).toEqual(200);
// //       expect(res2.body.message).toEqual("Comment Uploaded Successfully");
// //   });
// // 
// // 
// // });




