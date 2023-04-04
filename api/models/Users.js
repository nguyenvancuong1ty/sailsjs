/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: 'number', autoIncrement: true },
    userName: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    authorization: { type: 'number', required: true },
    password: { type: 'string', required: true }
  },
};

