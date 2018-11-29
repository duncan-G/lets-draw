const supertest = require('supertest');
const faker = require('faker');
const httpMocks = require('node-mocks-http');

const app = require('../../server/app');
const logger = require('../../config/logger');
const { User, db } = require('../../server/models');
const controllers = require('../../server/api/auth/controllers');

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

  afterAll(async () => {
    await db.sync({ force: true });
  });

  describe('Register user', () => {
    it('should save user0 before test suite begins', async () => {
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
          expect(response.body.error).toBe(
            'Account already exists. Please log in.'
          );
          expect(response.body.data).toBe('');
        });
    });

    // These errors do not include the errors that arise
    // when the server is unavailable; therefore, we should
    // expect the response to be JSON as it's more easily parsed
    it('should gracefully handle server errors', async () => {
      return requests.post('/api/auth/register')
        .send('a string')
        .expect(500)
        .expect('Content-Type', /json/)
        .then(response => {
          const error = response.body
          expect(Object.keys(error)).toContain('message');
          expect(Object.keys(error)).toContain('type');
          expect(typeof error.message).toBe('string')
          expect(typeof error.type).toBe('string')
        })
    });

    it('should login on successful register', () => {
      /* Create mock, req, res and next */

      const req = httpMocks.createRequest({
        body: {
          email: faker.internet.email(),
          password: 'super1337'
        }
      });
      // Mock fake passportJS login method
      req.login = (_, callback) => {
        callback(null)
      }

      const res = httpMocks.createResponse();

      // Next throws an error or passes req and res to login function
      const next = err => {
        if (err) {
          throw new Error(err);
        }
        controllers.handleSuccessfulLogin(req, res);
      };

      /* Make request */
      return controllers.register(req, res, next)
        .then(() => {
          const response = res._getData();
          expect(response.error).toBe('');
          expect(response.data).toBe('Successfully logged in.')
        }).catch(err => {
          throw new Error(err)
        })
    });
  });

  describe('Login user', () => {
    xit('should fail with wrong email', () => {});

    xit('should fail with incorrect password', () => {});

    xit('should gracefully handle server errors', () => {});

    const successfullReq = requests.post('/api/auth/login').send({
      email: 'anothervalid@email.com',
      password: 'password'
    });

    xit('should have the correct status and content type', () => {
      successfullReq.expect(200).expect('Content-Type', /json/);
    });

    xit('should have no errors', () => {
      return successfullReq.then(response => {
        expect(response.body.error).toBe('');
      });
    });

    xit('should not return sensitive data after registration', () => {
      return successfullReq.then(response => {
        expect(response.body.data.password).toBe(undefined);
      });
    });

    xit('should return a session cookie', () => {
      return successfullReq.then(response => {
        expect(response.session).not.toBe(undefined);
      });
    });
  });
});
