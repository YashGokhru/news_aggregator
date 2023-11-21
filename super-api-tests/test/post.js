import supertest from 'supertest';
// import env from '../qa/env';
// import common from './helper/common';
const request = supertest('http://localhost:3000');

const TOKEN = process.env.USER_TOKEN; 
// 
import { expect } from 'chai';

import { createRandomUser } from './user_testing';

describe.only('User posts', () => {
    let postId,userId=45225;
    
    // before(async()=>{

    //    userId = await  createRandomUser();
    // }),

    it('/posts', async () => {
        
            const data = {
               
                userid:userId,
                title:'head',
                content: 'tower',
                imagePath: 'abc',
                
            };
    
            try {
                const postres = await request
                    .post('posts')
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .send(data);
    
                // console.log('Response:', postres.body); 
                 console.log(data);
               
                expect(postres.status).to.satisfy((status) => {
                    
                    return status === 201 || status === 422 || status === 404;
                });
    
               
                if (postres.body.data) {
                    postId = postres.body.data.id;
                }
                // console.log(postres.body);
               
            } catch (error) {
                console.error('Error:', error); 
    
               
                if (error.response) {
                    console.error('Error Response:', error.response.body);
                }
    
               
                throw error;
            }
    });
        
        
    it('GET /posts/:id', async () => {
    try {
        const response = await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(404);

       console.log(response.body);
        if (response.body) {
           
        } else {
            console.error('Response body is undefined');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
 });



 describe('Testing', () => {
    it('201 Every Things Is Okk', async () => {
        const data = {
            userid: userId,
            title:'head',
            content: 'tower',
            imagePath: 'abc',
        };

        const postRes = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

       
 expect(postRes.status).to.eq(422);

 expect(postRes.body).to.exist;

 expect(postRes.body.message).to.be.undefined; 

    });

    it('422 Validation Failed', async () => {
        const data = 
        { body:{
            
            userid: userId,
            title:'',
            content: 'tower',
            imagePath: 'abc',
        }
        };
    
        const postRes = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
    
            console.log(postRes.status);
             console.log(postRes.body);
            expect(postRes.status).to.eq(422);
            expect(postRes.body).to.exist; 
            
            if (postRes.body.field !== undefined) {
                expect(postRes.body.field).to.be.an('array').that.includes('title');
            } else {
                
            }
            
            expect(postRes.body.message).to.be.undefined;
            
    });

  });

 });
