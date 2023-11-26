const supertest = require('supertest');
const app = require('../src/index'); // Replace with the path to your Express app file
const User = require('../src/model/UserModel'); // Replace with the path to your User model file
const bcrypt = require('bcrypt');
const connectDb = require('../src/config/DbConnection');
const mongoose = require('mongoose');


afterAll(async () => {
  
  // Close the database connection after all tests have finished
  await mongoose.connection.close();
});

describe("loginHandler", () => {
    it('should return 400 if email or password is missing', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({})
        .expect(400);
  
      expect(response.body).toEqual({ error: 'All Fields are mandotory' });
    });

   
    it('should return 400 if email or password is missing', async () => {
      const response = await supertest(app)
        .post('/user/login')
        .send({email:"202101237@daiict.ac.in"})
        .expect(400);
  
      expect(response.body).toEqual({ error: 'All Fields are mandotory' });
    });

   

});
