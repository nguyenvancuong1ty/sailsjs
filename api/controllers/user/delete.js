const { getIdLogin } = require("../../getIdLogin");

module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {
    id : { type : 'number', require}
  },


  exits: {

  },


  fn: async function ({id}) {

    const idLogin = getIdLogin(this.req);
    console.log(id);
    if (idLogin === 2) {
        Users.destroyOne({ id: id })
        .then(() => {
          return this.res.status(200).json({
            message: 'delete ok'
          });
        })
        .catch ((error)=> {
          return this.res.status(400).json({
            status: 'error',
            detail: error
          });
        })
      }
    else {
      // Nếu không có quyền quản trị, trả về lỗi cấm truy cập
      return this.res.forbidden('Bạn không có quyền truy cập vào tài nguyên này.');
    }

  }


};
