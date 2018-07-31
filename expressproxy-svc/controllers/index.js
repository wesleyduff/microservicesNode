const   apiController       = require('./api.server.controller')
        ,weatherController  = require('./api.weather.controller')
        ,trafficController  = require('./api.traffic.controller');


module.exports = {
    apiController,
    weatherController,
    trafficController
};