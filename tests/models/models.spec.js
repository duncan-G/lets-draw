const path = require('path');
require('dotenv').config({
  path: path.join(__dirname + '/../../.env.local')
});

const { db, User } = require('../../server/models');

// User tests
describe('User model', () => {
  const user = new User({
    email: 'valid@email.com',
    password: 'password'
  });

  const sequelizeErrors=['SequelizeValidationError', 'SequelizeUniqueConstraintError']

  it('should not save invalid emails', async () => {
    const invalidEmails = [
      '', null, undefined, 234234, 'astring', '234@2342.com'
    ];

    return Promise.all(
      invalidEmails.map(async invalidEmail => {
        try {
          await user.save();
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
        try {
          await user.save();
          throw new Error('should not save invalid password');
        } catch (err) {
          expect(sequelizeErrors).toContain(err.name);
        }
      })
    );
  });
});
