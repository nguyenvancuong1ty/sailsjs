/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
     find(req, res) {
       Voucher.find()
           .then(data => {
               return res.status(200).json({
                   data: data
               })
           })
           .catch((e) => {
             return res.status(400).json({
               status: 'error ',
               detail: e
             }) 
           })
     },
   };
   