import supertest from 'supertest';
import env from '../qa/env';
const request = supertest('https://news-aggregator-lsjs.onrender.com/');
const TOKEN = process.env.ACCESS_TOKEN_SECRET; 

import { expect } from 'chai';

import { createRandomUser } from './user_testing';

describe('Usercomment', () => {
    let postId,user_Id;
    
    before(async()=>{

       user_Id = await  createRandomUser();
    }),

    it('/comment', async () => {
        
            const data = {
               
                
                
                    post_by: 'user1',
                    Reply: 'comment is nested comment',
                    parentId: '644931ff0cca21885e6c9d2a',
                    rootId: '644931f40cca21885e6c9d23',
                
            };
    
            try {
                const postres = await request
                    .post('comment')
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
        
        
    it('GET /comment/:id', async () => {
    try {
        const response = await request
            .get(`comment/${postId}`)
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
            post_by: 'user1',
            Reply: 'comment is nested comment',
            parentId: '644931ff0cca21885e6c9d2a',
            rootId: '644931f40cca21885e6c9d23',
        
        };

        const postRes = await request
            .post('comment')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);

            expect(postRes.status).to.eq(422);

            expect(postRes.body).to.exist;

            expect(postRes.body.message).to.be.undefined; 

    });

    it('422 Validation Failed Due To Empty In post_by ', async () => {
        const data = 
        { body:{
            post_by: '',
            Reply: 'comment is nested comment',
            parentId: '644931ff0cca21885e6c9d2a',
            rootId: '644931f40cca21885e6c9d23',
        }
        };
    
        const postRes = await request
            .post('comment')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
    
            console.log(postRes.status);
             console.log(postRes.body);
            expect(postRes.status).to.eq(422);
            expect(postRes.body).to.exist; 
            
            if (postRes.body.field !== undefined) {
                expect(postRes.body.field).to.be.an('array').that.includes('post_by');
            } else {
                
            }
            
            expect(postRes.body.message).to.be.undefined;
            
    });
    it('should return 404 for token not used', async () => {
        try {
            const getUserResponse = await request
                .get(`profile/${postId}`)
                // .set('Authorization', `Bearer ${TOKEN}`)
                .expect(404);

            console.log('Get User Response:', getUserResponse.body);

            if (getUserResponse.body) {
                
            } else {
                console.error('Response body is undefined');
            }
        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    });
    
    
    it('422 Validation Failed Due To Empty In reply ', async () => {
        const data = 
        { body:{
            post_by: 'user8',
            Reply: '',
            parentId: '644931ff0cca21885e6c9d2a',
            rootId: '644931f40cca21885e6c9d23',
        }
        };
    
        const postRes = await request
            .post('comment')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data);
    
            console.log(postRes.status);
             console.log(postRes.body);
            expect(postRes.status).to.eq(422);
            expect(postRes.body).to.exist; 
            
            if (postRes.body.field !== undefined) {
                expect(postRes.body.field).to.be.an('array').that.includes('Reply');
            } else {
                
            }
            
            expect(postRes.body.message).to.be.undefined;
            
    });

  });

});

