const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/model/UserModel');
const { sendEmail } = require('../utils/sendEmail'); // Assuming you have an email utility function
const mongoose = require('mongoose');
// const jest = require('jest');

jest.mock('../src/model/UserModel');
jest.mock('../utils/sendEmail');

describe('ForgotPassword', () => {
    it('should return 400 if email is missing', async () => {
        const response = await supertest(app)
            .post('/user/forgotpassword')
            .send({})
            .expect(400);

        expect(response.body).toEqual({ message: 'Email is required' });
    });

    it('should return 400 if user with given email is not found', async () => {
        const response = await supertest(app)
            .post('/user/forgotpassword')
            .send({ email: 'smeetagr@gmail.com' })
            .expect(400);

        expect(response.body).toEqual({ message: 'User not found' ,check:false});
    });

    it('should return 200 and send email on successful request', async () => {
        const user = { email: '202101237@daiict.ac.in' };
        User.findOne.mockResolvedValue(user);

        const response = await supertest(app)
            .post('/user/forgotpassword')
            .send({ email: '202101237@daiict.ac.in' })
            .expect(200);

        expect(response.body).toEqual({message:"User found",check:true});
    });

    it('should return 500 if an error occurs during the process', async () => {
        User.findOne.mockRejectedValue(new Error('Database error'));

        const response = await supertest(app)
            .post('/user/forgotpassword')
            .send({ email: 'test@example.com' })
            .expect(500);

        expect(response.body).toEqual({ message: 'An error occurred',check:false });
    });
});
