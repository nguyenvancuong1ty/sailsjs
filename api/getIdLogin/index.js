const jwt = require('jsonwebtoken');
const secret_key = "config-token";

module.exports = {
    getIdLogin(req){
        let bearerToken;
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined' && bearerHeader !== null) {
            const bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
        } else {
            console.log('error...');
        }
        if(req.token !== 'null') {
            const decodedHeader =  jwt.verify(req.token, secret_key);
            return decodedHeader.id;
        }
        return false;
    },
}