/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
require('dotenv').config()
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const secret_key = "config-token";
const md5 = require('md5');
const { getIdLogin } = require('../getIdLogin');


module.exports = {
   
  /**
  * @swagger
  * components:
  *   securitySchemes:
  *     basicAuth:
  *       type: http
  *       scheme: bearer
  *   schemas:
  *     Users:
  *       type: object
  *       properties:
  *         email:
  *           type: string
  *         userName:
  *           type: string
  *         password:
  *           type: string
  * 
  * /findByName:
  *   tags:
  *     - Users
  *   summary: Get Users
  *   description: Get Users By UserName
  *   produces: 
  *     - application/json
  *   responses:
  *     200:
  *       description: Get user success!
  * /find:
  *   get:
  *     security:
  *       - basicAuth: []
  *   tags:
  *     - Users
  * 
  * /store:
  *   tags:
  *     - Users
  *   summary: Create User
  *   description: Create new User
  *   requestBody:
  *     description: Create a new User
  *     content: 
  *       application/json:
  *         schema:
  *           $ref: '#/components/schemas/Users'
  *   responses:
  *     201:
  *       description: User created successfully!
  *     400:
  *       description: Bad request
  */
    async sendEmail(req, res) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type: 'OAuth2',
          user: 'nguyenvancuong19032002@gmail.com', // generated ethereal user
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN
        },
      });
      const id = getIdLogin(req);
      if(id) {
        await transporter.sendMail({
          from: 'Email thank you', // sender address
          to: ["nguyenvancuong13102001t@gmail.com", "2007050110@hanu.edu.vn"], // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Thank you", // plain text body
          html: `
          <p>Chúng tôi xin gửi lời cảm ơn chân thành đến bạn đã tin tưởng và mua hàng từ cửa hàng của chúng tôi. Chúng tôi rất trân trọng sự ủng hộ của bạn.</p>
          <p>Chúng tôi mong rằng cô gái đã đáp ứng đúng như mong đợi của bạn và đem lại sự hài lòng. Để giúp chúng tôi cải thiện chất lượng dịch vụ và sản phẩm của mình, chúng tôi xin nhắc bạn đến việc đánh giá sản phẩm thông qua link dưới đây:</p>
          <a href = 'http://localhost:3000/vote'> Please vote for the ticket here</a>
          <h2>Thank you...<h2>
          <img src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-cap-2-3.jpg" alt="Girl in a jacket" width="200" height="200" style = "display: block; margin: 0 auto">`, // html body
        })
        .then(() => {
          return res.status(200).json({
            message: 'Send Email success'
          })
        }) 
        .catch((error) => {
          return error
        })
      }
      else {
        return res.status(400).json({
          message: 'Login require'
        })
      }
    },
    store(req, res) {
        Users.create({
          email: req.body.email,
          userName: req.body.userName,
          authorization: 0,
          password: md5(req.body.password)
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
  
   delete(req, res) {
    const id = getIdLogin(req);
    if (id === 2) {
        Users.destroyOne({ id: req.params.id })
        .then(() => {
          return res.status(200).json({
            message: 'delete ok'
          });
        })
        .catch ((error)=> {
          return res.status(400).json({
            status: 'error',
            detail: error
          });
        })
      }
    else {
      // Nếu không có quyền quản trị, trả về lỗi cấm truy cập
      return res.forbidden('Bạn không có quyền truy cập vào tài nguyên này.');
    }
  },
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
      },
    findByName(req,res) {
      const {username} = req.params;
      Users.find({
        where: {
          userName: {
            like: `%${username.toLowerCase()}%`
          }
        }
      })
      .then((data) => {
        return res.status(200).json({
          data: data
        })
      })
      .catch((e) => {
        return res.status(400).json({
          error: e
        })
      })
    },

    login(req,res) {
      Users.findOne(
          { userName: req.body.username,
            password: md5(req.body.password)} )
      .then((data) => {
        if(data) {
          const token = jwt.sign({ id: data.id, password: data.password }, secret_key)
          return res.status(200).json({
            message: "Login success!",
            token: token
          })
        }
        else {
          return res.status(200).json({
            message: "Invalid email or password"
          })
        }
      })
      .catch((e) => {
        console.error(e);
      })
    },

    deleteMulti(req, res) {
      Users.destroy({ id : req.body.id})
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

      pagination(req, res) {
        let totalUsers;
        Users.count()
        .then((data) => {
          totalUsers = data;
          })
        const {limit, page} = req.params;
       
        Users.find()
          .limit(limit)
          .skip((page-1)*limit)
          .then((data) => {
            return res.status(200).json({
                data: data,
                totalPages: parseInt((totalUsers/limit) + 1)
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
