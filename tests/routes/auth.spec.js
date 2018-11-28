const supertest = require('supertest');
const logger = require('../../config/logger');
const { User, db } = require('../../server/models');
const app = require('../../server/app');

describe('User routes', () => {
  const requests = supertest(app);
  let user0;

  beforeAll(async () => {
    // user0 is saved in the database
    user0 = {
      email: 'valid@email.com',
      password: 'password'
    };
    await db.sync({ force: true });
    await User.create(user0);
  });

  describe('Register user', () => {
    it('should save user0 before test suite', async () => {
      const savedUser = await User.findOne({
        where: { email: user0.email }
      });
      expect(savedUser).not.toBe(null);
    });

    it('should fail to register existing account', () => {
      return requests
        .post('/api/auth/register')
        .send(user0)
        .expect(400)
        .expect('Content-Type', /json/)
        .then(response => {
          console.log('bodyyyyyyyyyyyyyyyyyyyyyy', response.body.error);
          expect(response.body.error).toBe(
            'Account already exists. Please log in'
          );
          expect(response.body.data).toBe('');
        });
    });

    const successfullReq = requests.post('/api/auth/register').send({
      email: 'anothervalid@email.com',
      password: 'password'
    });

    it('should have the correct status and content type', () => {
      successfullReq.expect(200).expect('Content-Type', /json/);
    });

    it('should have no errors', () => {
      return successfullReq.then(response => {
        expect(response.body.error).toBe('');
      });
    });

    it('should not return sensitive data after registration', () => {
      return successfullReq.then(response => {
        expect(response.body.data.password).toBe(undefined);
      });
    });

    it('should return a session cookie', () => {
      return successfullReq.then(response => {
        expect(response.session).not.toBe(undefined);
      })
    })

  });
});
