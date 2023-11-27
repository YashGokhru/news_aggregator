const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/model/UserModel');
const bcrypt = require('bcrypt');
const connectDb = require('../src/config/DbConnection');
const mongoose = require('mongoose');

describe("loginHandler", () => {
    it('should return 400 if email or password is missing', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({"email":"202101237@daiict.ac.in"})
        .expect(400);
  
      expect(response.body).toEqual({ error: 'All Fields are mandatory' });
    });

   
    it('should return 400 if email or password is missing', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({})
        .expect(400);
  
      expect(response.body).toEqual({ error: 'All Fields are mandatory' });
    });




    it('should return 200 and set "jwt" cookie on successful login', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({ "email": "202101237@daiict.ac.in", "password": "smeet12345" })
        .expect(200);
    
      // Check the response body
      expect(response.body).toEqual({ message: 'Successfully logged in' });
    
      // Check if the "jwt" cookie is set
      expect(response.headers['set-cookie']).toBeDefined();
      const cookies = response.headers['set-cookie'].map(cookie => cookie.toLowerCase()); // Convert to lowercase for case-insensitive comparison
      expect(cookies.some(cookie => cookie.includes('jwt'))).toBe(true);
    });
    
  
    it('should return 401 on unsuccessful login', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({ "email": "202101237@daiict.ac.in", "password": "invalidpassword" })
        .expect(401);
  
      // Check the response body
      expect(response.body).toEqual({ error: 'Email or password is not valid' });
  
      // Check if the "jwt" cookie is NOT set in this case
      expect(response.headers['set-cookie']).toBeUndefined();
    });
  
    // Add more test cases as needed






  });


