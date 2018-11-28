const { db, User } = require('../../server/models');
const logger = require('../../config/logger');

// User tests
describe('User model', () => {
  let user;
  const sequelizeErrors=['SequelizeValidationError', 'SequelizeUniqueConstraintError']

  afterAll(async () => {
    await db.sync({ force: true})
  })

  beforeEach(() => {
    user = new User({
      email: 'valid@email.com',
      password: 'password'
    });
  })

  it('should not save invalid emails', async () => {
    const invalidEmails = [
      '', null, undefined, 234234, 'astring'
    ];

    return Promise.all(
      invalidEmails.map(async invalidEmail => {
        user.email = invalidEmail;
        try {
          await user.validate();
          throw new Error('should not save invalid password');
        } catch (err) {
          expect(sequelizeErrors).toContain(err.name);
        }
      })
    );
  });

  it('should not save an invalid password', async () => {
    const invalidPasswords = ['', null];

    return Promise.all(
      invalidPasswords.map(async invalidPassword => {
        user.password = invalidPassword;
        try {
          await user.validate();
          throw new Error('should not save invalid password');
        } catch (err) {
          expect(sequelizeErrors).toContain(err.name);
        }
      })
    );
  });

  it('should encrypt password before saving', async () => {
    const password = user.password;
    await user.save();
    expect(user.id).not.toBe(undefined);
    expect(user.password).not.toBe(password);
  })
});
