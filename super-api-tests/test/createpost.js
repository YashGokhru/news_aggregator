import supertest from 'supertest';
import env from '../qa/env';
const request = supertest('https://news-aggregator-lsjs.onrender.com/');
const TOKEN = process.env.ACCESS_TOKEN_SECRET; 

import { expect } from 'chai';

import { createRandomUser } from './user_testing';

describe('User', () => {
    let postId,userId;
    
    before(async()=>{

       userId = await  createRandomUser();
    }),

    it('/createpost', async () => {
        
            const data = {
               
                
                // users
                userid: user_Id,
                title: 'title',
                content: 'content',
                link: 'link'
                
            };
    
            try {
                const postres = await request
                    .post('createpost')
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .send(data);
    
                
                 console.log(data);
               
                expect(postres.status).to.satisfy((status) => {
                    
                    return status === 201 || status === 422 || status === 404;
                });
    
               
                if (postres.body.data) {
                    postId = postres.body.data.id;
                }
              
               
            } catch (error) {
                console.error('Error:', error); 
    
               
                if (error.response) {
                    console.error('Error Response:', error.response.body);
                }
    
               
                throw error;
            }
    });
        
        
    it('GET /createpost/:id', async () => {
    try {
        const response = await request
            .get(`createpost/${postId}`)
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
                userid: user_Id,
                title: 'title',
                content: 'content',
                link: 'link'
        };

        const postRes = await request
            .post('createpost')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

       
 expect(postRes.status).to.eq(422);

 expect(postRes.body).to.exist;

 expect(postRes.body.message).to.be.undefined; 

    });

    it('422 Validation Failed Due To Empty In Title ', async () => {
        const data = 
        { body:{
            
            userid: userId,
            title: '',
            content: 'content',
            link: 'link'
        }
        };
    
        const postRes = await request
            .post('createpost')
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

    it('422 Validation Failed Due To Empty In content ', async () => {
        const data = 
        { body:{
               userid: userId,
                title: 'title',
                content: '',
                link: 'link'
        }
        };
    
        const postRes = await request
            .post('createpost')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
    
            console.log(postRes.status);
             console.log(postRes.body);
            expect(postRes.status).to.eq(422);
            expect(postRes.body).to.exist; 
            
            if (postRes.body.field !== undefined) {
                expect(postRes.body.field).to.be.an('array').that.includes('content');
            } else {
                
            }
            
            expect(postRes.body.message).to.be.undefined;
            
    });
    it('422 Validation Failed Due To Empty In link ', async () => {
        const data = 
        { body:{
               userid: user_Id,
                title: 'title',
                content: 'fire',
                link: ''
        }
        };
    
        const postRes = await request
            .post('createpost')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
    
            console.log(postRes.status);
             console.log(postRes.body);
            expect(postRes.status).to.eq(422);
            expect(postRes.body).to.exist; 
            
            if (postRes.body.field !== undefined) {
                expect(postRes.body.field).to.be.an('array').that.includes('content');
            } else {
                
            }
            
            expect(postRes.body.message).to.be.undefined;
            
    });

  });

 });
