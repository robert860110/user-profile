module.exports = {
    requireAuthentication: function(req, res, next) {
        console.log('pricate route hit');
        next();
    },
    logger: function(req, res, next) {
        console.log(req.method + new Date().toString());
        next();
    }

};
