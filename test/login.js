import supertest from 'supertest';
const request = supertest(process.env.PORT);

import { expect } from 'chai';
// import { Test } from 'mocha';

const TOKEN = process.env.USER_TOKEN;


describe.only('User Login', () => {

    describe('Positive Tests', () => {
        let userId;
        it('200: OK - Everything worked as expected', async () => {
            const data = {
                body: {
                    username:"Test",
                    password:"1234"
                }
            };
        
           
            const postRes = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data);
        
            
            expect(postRes.status).to.eq(200);
        
            
            expect(postRes.body).to.exist;
        
            expect(postRes.body.data).to.exist;
        });
        

        it('401 Authentication Failed Token Not Used', async () => {
            const data = {

                body: {
                    username:"Test",
                    password:"1234"
                }
                
            };
    
            const postRes = await request
            .post('posts')
            .send(data);
            expect(postRes.body.code).to.eq(401);
            
           
        expect(postRes.body.data.message).to.eq('Authentication failed');
        });
        it('422 Authentication Failed', async () => {
            const data = {
                username:"Test",
                password:""
            
            };
    
            const postRes = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data);
    
            console.log(postRes.body);
            // Check the response status code
            expect(postRes.body.code).to.eq(422);
            // expect(postRes.body.data[0].field).to.eq('body');
            expect(postRes.body.data[0].field).to.eq('user');
    
            expect(postRes.body.data[0].message).to.eq("must exist");
        });
    
    });
});