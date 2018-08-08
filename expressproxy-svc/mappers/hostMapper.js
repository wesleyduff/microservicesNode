const {
    rootController
} = require('../controllers'),
    generatedRoutes         =   require('./dist/uri_json.json');

module.exports = (host) => {
    console.log('---host ', host)
    const foundHost = generatedRoutes.data.find(item => item.host.toLowerCase() === host.toLowerCase());
    foundHost.controller = rootController;
    if(!foundHost){
        return generatedRoutes.data[0];
    } else {
        return foundHost;
    }
}