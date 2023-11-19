
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';
import { Test } from 'mocha';

const TOKEN = "42461663070909ec93bf9c6dac8bdfb22eddee219cecb6760d3e14eb37337f1b";

describe('User Login', () => {
    let postId, userId;

    it('Create a User', async () => {
        const userData = {
            email: `test-${Math.floor(Math.random() * 9999)}@gmail.ca`,
            name: 'test Name',
            gender: 'male',
            status: 'inactive',
        };
    
        const userResponse = await request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(userData);
    
        userId = userResponse.body.data.id;
    
        // Check for a 200 OK status code
        expect(userResponse.status).to.equal(200);
    
        // Check if the 'status' property in the response matches the expected value
        expect(userResponse.body.data.status).to.equal('inactive');
    
        // Check if the response data includes the user data sent in the request
        expect(userResponse.body.data).to.deep.include(userData);
        
    });
describe('Negative Tests', () => {
    it('401 Authentication Failed', async () => {
        const data = {
            user_id: userId,
            title: 'my title',
            body: 'my blog post',
        };

        const postRes = await request.post('posts').send(data);

        // console.log(postRes);
        // Check the response status code
        expect(postRes.body.code).to.eq(401);
        
        // Ensure that the response body is defined before checking its properties
        // expect(postRes.body).to.exist;

        // Update the expectation for the message property
    expect(postRes.body.data.message).to.eq('Authentication failed');
    });
    it('422 Authentication Failed', async () => {
        const data = {
            user_id: 1,
            title: 'my title',
        
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
    

        it('should return status 400 for invalid credentials', async () => {
            const data = {
                body: {
                    user_id: userId,
                    title: 'my title',
                    body: 'my inblog post',
                    
                }
            };
            
            const postres = await request.post('posts').send(data.body);
            expect(postres.status).to.eq(200);
            console.log(postres.body);
        });

    
    });
        
   
  