const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/model/UserModel');
const bcrypt = require('bcrypt');
jest.setTimeout(50000); // Set the default timeout to 10 seconds (10000 ms) or adjust as needed

// Your test cases here


jest.mock('../src/model/UserModel');

describe('ResetPassword', () => {
    it('should return 401 if new password or confirm password is missing', async () => {
        const response = await supertest(app)
            .post('/user/resetpassword')
            .send({ email: 'test@example.com' })
            .expect(401);

        expect(response.body).toEqual({ error: 'All fields are Mandatory' });
    });

    it('should return 401 if new password and confirm password do not match', async () => {
        const response = await supertest(app)
            .post('/user/resetpassword')
            .send({ newP: 'newPassword', confP: 'differentPassword', email: 'test@example.com' })
            .expect(401);

        expect(response.body).toEqual({ error: 'Both Fields should be same' });
    });

    it('should return 401 if user with given email is not found', async () => {
        User.findOne.mockResolvedValue(null);

        const response = await supertest(app)
            .post('/user/resetpassword')
            .send({ newP: 'newPassword', confP: 'newPassword', email: 'nonexistent@example.com' })
            .expect(401);

        expect(response.body).toEqual({ error: 'Go and register First' });
    });

    // it('should return 200 and update the password on successful reset', async () => {
    //     const user = { email: 'test@example.com' };
    //     User.findOne.mockResolvedValue(user);
    //     bcrypt.hash = jest.fn(() => Promise.resolve('hashedPassword'));
    //     User.prototype.save = jest.fn();

    //     const response = await supertest(app)
    //         .post('/user/resetpassword')
    //         .send({ newP: 'newPassword', confP: 'newPassword', email: 'test@example.com' })
    //         .expect(200);

    //     expect(response.body).toEqual({ message: 'Updated Successfully' });
    //     expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
    //     expect(User.prototype.save).toHaveBeenCalled();
    // });

    // it('should return 500 if an error occurs during the password update process', async () => {
    //     User.findOne.mockResolvedValue({ email: 'test@example.com' });
    //     bcrypt.hash = jest.fn(() => Promise.resolve('hashedPassword'));
    //     User.prototype.save = jest.fn(() => Promise.reject(new Error('Database error')));

    //     const response = await supertest(app)
    //         .post('/user/resetpassword')
    //         .send({ newP: 'newPassword', confP: 'newPassword', email: 'test@example.com' })
    //         .expect(500);

    //     expect(response.body).toEqual({ error: 'Database error' });
    // });
});
