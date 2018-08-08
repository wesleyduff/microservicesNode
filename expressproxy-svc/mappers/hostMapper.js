const {
    rootController
} = require('../controllers'),
    generatedRoutes         =   require('./dist/uri_json.json');

module.exports = (ingestURI) => {
    console.log('---host ', ingestURI)
    const foundHost = generatedRoutes.data.find(item => item.ingestUri.toLowerCase() === ingestURI.toLowerCase());
    if(!foundHost){
        return generatedRoutes.data[0];
    } else {
        foundHost.controller = rootController;
        return foundHost;
    }
}