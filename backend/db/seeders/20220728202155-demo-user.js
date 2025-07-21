'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tablename = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fake',
        lastName: 'User1',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pho',
        lastName: 'User2',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Foo',
        lastName: 'User3',
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fu',
        lastName: 'User4',
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down(queryInterface, Sequelize) => {
    options.tablename = 'Users'
    await queryInterface.bulkDelete(options);
  }
};
