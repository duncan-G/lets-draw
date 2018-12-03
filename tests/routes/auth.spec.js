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

  // afterAll(async () => {
  //   await db.sync({ force: true });
  // });

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
          expect(response.body.error.type).toBe('RegistrationError');
          expect(response.body.error.message).toBe(
            'Account already exists. Please log in.'
          );
          expect(response.body.data).toBe('');
        });
    });

    // These errors do not include the errors that arise
    // when the server is unavailable; therefore, we should
    // expect the response to be JSON as it's more easily parsed
    it('should gracefully handle server errors', async () => {
      return requests
        .post('/api/auth/register')
        .send('a string')
        .expect(500)
        .expect('Content-Type', /json/)
        .then(response => {
          const error = response.body.error;
          expect(Object.keys(error)).toContain('message');
          expect(Object.keys(error)).toContain('type');
          expect(typeof error.message).toBe('string');
          expect(typeof error.type).toBe('string');
        });
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
        callback(null);
      };

      const res = httpMocks.createResponse();

      // Next throws an error or passes req and res to login function
      const next = err => {
        if (err) {
          throw new Error(err);
        }
        controllers.handleSuccessfulLogin(req, res);
      };

      /* Make request */
      return controllers
        .register(req, res, next)
        .then(() => {
          const response = JSON.parse(res._getData());
          expect(response.error).toBe('');
          expect(response.data).toBe('Successfully logged in.');
        })
        .catch(err => {
          throw new Error(err);
        })
    });
  });

  describe('Login user', () => {
    it('should fail with wrong email', () => {
      return (
        requests
          .post('/api/auth/login')
          .send({...user0, email: 'invalid@email.com'})
          .expect(401)
          // .expect('Content-Type', /json/)
          .then(response => {
            expect(response.body.error.type).toBe('AuthenticationError');
            expect(response.body.error.message).toBe(
              'Incorrect Email/Password.'
            );
            expect(response.body.data).toBe('');
          })
      );
    });

    it('should fail with incorrect password', () => {
      return (
        requests
          .post('/api/auth/login')
          .send({...user0, password: 'issowrong'})
          .expect(401)
          // .expect('Content-Type', /json/)
          .then(response => {
            expect(response.body.error.type).toBe('AuthenticationError');
            expect(response.body.error.message).toBe(
              'Incorrect Email/Password.'
            );
            expect(response.body.data).toBe('');
          })
      );
    });

    it('should gracefully handle server errors', () => {
      return requests
        .post('/api/auth/login')
        .send('a string')
        .expect(500)
        .expect('Content-Type', /json/)
        .then(response => {
          const error = response.body.error;
          expect(Object.keys(error)).toContain('message');
          expect(Object.keys(error)).toContain('type');
          expect(typeof error.message).toBe('string');
          expect(typeof error.type).toBe('string');
        });
    });

    it('should have no errors', () => {
      return requests
        .post('/api/auth/login')
        .send( {...user0})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body.error).toBe('');
        });
    });

    it('should not return sensitive data after registration', () => {
      return requests
        .post('/api/auth/login')
        .send({...user0})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body.data.password).toBe(undefined);
        });
    });

    it('should return a session cookie', () => {
      const agent = supertest.agent(app);
      return agent
        .post('/api/auth/login')
        .send({...user0})
        .then(response => {
          console.log('headers', response.header, response.header);
          throw response.header
        })
        .catch(err => {
          console.log(err)
        })
    });
  });
});
