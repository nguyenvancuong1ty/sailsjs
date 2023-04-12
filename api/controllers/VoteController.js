/**
 * VoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { getIdLogin } = require("../getIdLogin");

const getDate = () => {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;     
    return formattedDate;
}
module.exports = {
    vote(req, res) {
        const id = getIdLogin(req);
        Vote.find({
            user_id: id,
            cake_id: 1
        })
        .then((res) => {
            if(res.length > 0 && res[0].voted) {
                return true
            }
            return false;
            })
        .then((isVote) => {
            if(!isVote) {
                Vote.create({
                    user_id : id,
                    cake_id : 1,
                    vote_status : req.body.status,
                    voted : true,
                    date_vote  : getDate()
                })
                .then(() => {
                    res.status(200).json({message : 'Vote success...'})
                })
                .catch((e) => {res.status(400).json({Error : e}) })
            }
            else {
                return res.status(200).json({
                    message: 'Bạn đã Vote rồi'
                })
            } 
        })
        .catch((e) => { console.log('Error', e); return res.status(400).json({Error: e})})
      },
    // Rollback
    //   async delete(req, res) {
    //     await sails.getDatastore()
    //     .transaction(async (db)=> {
    //         await Vote.destroyOne({
    //             user_id: 2,
    //             cake_id: 1
    //         })
    //         .usingConnection(db);
            
    //         await Vote.create({
    //             user_id : 2,
    //             cake_id : 2,
    //             vote_status : req.body.status,
    //             voted : true,
    //             date_vote  : getDate()
    //         })
    //         .usingConnection(db);
    
    //         return res.status(200).json({
    //             message : 'Delete and create success...'
    //         });
    //     })
    //     .intercept((error) => {
    //         return res.status(400).json({
    //             message : 'Error', error
    //         });
    //     })
    // },
    async delete(req, res) {
            await Vote.destroyOne({
                user_id: 2,
                cake_id: 99
            })
            await Vote.create({
                user_id : 2,
                cake_id : 1,
                vote_status : req.body.status,
                voted : true,
                date_vote  : getDate()
            })
            .then(() => {
                return res.status(200).json({
                    message : 'Delete and create success...'
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    message : 'Error', error
                });
            })
            
        }
 
};

