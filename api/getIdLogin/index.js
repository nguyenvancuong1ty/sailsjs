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
            const decodedHeader =  sails.config.globals.jwt_config.verify(req.token, sails.config.globals.secret_key);
            return decodedHeader.id;
        }
        return false;
    },
}