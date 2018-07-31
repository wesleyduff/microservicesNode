const {
    apiController,
    weatherController,
    trafficController
} = require('../controllers');

const hosts = [
    { host: 'localhost' ,   controller: apiController },
    { host: 'weather'   ,   controller: weatherController },
    { host: 'traffic'   ,   controller: trafficController }
]
module.exports = (host) => {
    const foundHost = hosts.find(item => item.host.toLowerCase() === host.toLowerCase());
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}