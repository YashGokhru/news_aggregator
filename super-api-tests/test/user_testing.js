import supertest from 'supertest';
const request = supertest('http://localhost:3000');
const TOKEN = process.env.USER_TOKEN; 
const { expect } = require('chai');

export const createRandomUser = async () => {
    const userdata = {

 email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
name: 'testes',
password:'1234'
    };

   const res = await request
    .post('users')
    .set('Authorization',`Bearer ${TOKEN}`)
    .send(userdata)

    return res.body.id
        
};



let postId; 

describe('User validation', () => {

    it('/users', async () => {
        
        const data = {
           
          email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
          name: 'testes',
          password:'1234'
            
        };

        try {
            const postres = await request
                .post('users')
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
    

   
    it('GET /users/:id', async () => {
        
                try {
                    const response = await request
                        .get(`users/${postId}`)
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
            
    describe('Positive Tests', () => {
        it.only('201 Every Things Is Okk', async () => {
            const data = {
            email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
            name: 'testes',
            password:'1234'
            };
    
            const postRes = await request
                .post('users')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data);
    
           
    expect(postRes.status).to.eq(201);
    
    expect(postRes.body).to.exist;
    
    expect(postRes.body.message).to.be.undefined; 
    
        });
        
        
    });
    describe('Negative  Tests', () => {
        
        it('422 Validation Failed', async () => {
            const data = 
            {
                email: `test${Math.floor(Math.random() * 9999)}@mail.ca`,
                name: '',
                password:'1234'
            };
        
            const postRes = await request
                .post('users')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data);
        
                console.log(postRes.status);
                console.log(postRes.body);
                expect(postRes.status).to.eq(422);
                expect(postRes.body).to.exist; 
                
                if (postRes.body.field !== undefined) {
                    expect(postRes.body.field).to.be.an('array').that.includes('name');
                } else {
                    
                }
                
                expect(postRes.body.message).to.be.undefined;
                
        });
        it('should return 404 for non-existing user', async () => {
            try {
                const getUserResponse = await request
                    .get(`users/${postId}`)
                    .set('Authorization', `Bearer ${TOKEN}`)
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
   
});
});