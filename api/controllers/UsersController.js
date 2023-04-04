/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // Create new User
    store(req, res) {
        Users.create({
          email: req.body.email,
          userName: req.body.userName,
          authorization: 0,
          password: req.body.password
        })
        .then(() => {
          return res.status(200).json({
            res : 'create ok'
          });
        })
        .catch((e) => {
          return res.status(400).json({
            status: 'error ',
            detail: e
          }) 
        })
      }
      ,
  // Get All Users
  find(req, res) {
    Users.find()
        .then(users => {
            return res.status(200).json({
                data: users
            })
        })
        .catch((e) => {
          return res.status(400).json({
            status: 'error ',
            detail: e
          }) 
        })
},
  // DELETE User By Id
  delete(req, res) {
    Users.destroyOne({ id : req.params.id})
        .then(() => {
            return res.status(200).json({
                status: 'delete ok'
            })  
        })
        .catch((e) => {
          return res.status(400).json({
            status: 'error ',
            detail: e
          }) 
        })
    },

    // Update 
    update(req, res) {
      Users.updateOne({ id : req.params.id})
          .set({
            email: req.body.email,
            userName: req.body.userName,
            authorization: 0,
            password: req.body.password
          })
          .then(() => {
              return res.status(200).json({
                  status: 'update ok'
              })  
          })
          .catch((e) => {
            return res.status(400).json({
              status: 'error',
              detail: e
          }) 
          })
      }

};
