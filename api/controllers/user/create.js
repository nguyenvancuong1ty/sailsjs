const md5 = require('md5');
module.exports = {

  friendlyName: 'Create',
  
  description: 'Create user.',


  inputs: {
    id: { type: 'number', autoIncrement: true },
    userName: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    authorization: { type: 'number' },
    password: { type: 'string', required: true }
  },

  exits: {
    invalid: {
      statusCode: 409,
      description: 'firstname, lastname, email and password is required.'
    },
    success: {
      statusCode: 201,
  }
 },

 fn: async function (inputs,exits) {
    try {
      await Users.create({
        email: inputs.email,
        userName: inputs.userName,
        authorization: 0,
        password: md5(inputs.password)
      });
      return exits.success({
        message: 'Create account success...',
      });
    } 
    catch (e) {
      return exits.invalid({
        status: 'error',
        detail: e
      }) 
    }
  }



};
