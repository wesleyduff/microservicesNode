import {
    rootController,
} from '../controllers/index';

const hosts = [
    { hook: 'weather',  host: 'wsidata.weather.com',      type: 'JSON',   controller: rootController(),   ingestURI: 'http://testharness.com:8080/201303/en-us/37082592/weather.json'},
    { hook: 'traffic',  host: 'wsidata.weather.com',      type: 'JSON',   controller: rootController(),   ingestURI: 'http://testharness.com:8080/201303/en-us/37082592/traffic.json'},
    { hook: 'lottery',  host: 'lotterynumbersxml.com',    type: 'XML',    controller: rootController(),   ingestURI: 'http://testharness.com:8080/'}
 ];

export default (hook) => {
    console.log('--- host host --> ', hook)
    const foundHost = hosts.find(item => item.hook === hook);
    console.log('--- found houst', foundHost)
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}