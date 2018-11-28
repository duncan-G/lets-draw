const { db, User } = require('../../server/models');
const logger = require('../../config/logger');
const chalk = require('chalk');

// User tests
describe('User model', () => {
  let user;
  const sequelizeErrors = [
    'SequelizeValidationError',
    'SequelizeUniqueConstraintError'
  ];

  beforeEach(async () => {
    await db.sync({ force: true });
  });

  beforeEach(() => {
    user = new User({
      email: 'valid@email.com',
      password: 'password'
    });
  });

  it('should not save invalid emails', async () => {
    const invalidEmails = ['', null, undefined, 234234, 'astring'];

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
    const invalidPasswords = ['', null, 'short', 'reeeaaaaallyyyyyylongggg'];

    return Promise.all(
      invalidPasswords.map(async invalidPassword => {
        user.password = invalidPassword;
        try {
          await user.validate();
          throw new Error(
            `should not validate invalid password: ${invalidPassword}`
          );
        } catch (err) {
          if (err.name === 'Error') {
            console.log(chalk.magenta(err.message));
          }
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
  });

  it('should invalidate incorrect password', async () => {
    await user.save();
    expect(user.validPassword('incorrect'));
  });
  it('should validate correct password', async () => {
    const password = user.password;
    await user.save();
    expect(user.validPassword(password)).toBeTruthy();
  });
});
