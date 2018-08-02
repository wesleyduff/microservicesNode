import {
    rootController,
} from '../controllers/index';

const   EXPRESSPROXY_PORT   =   process.env.EXPRESSPROXY_PORT   ||  '8080',
        //EXPRESSPROXY_DNS    =   process.env.EXPRESSPROXY_DNS    ||  'http://testharness.com';
        EXPRESSPROXY_DNS = 'https://expressproxy-svc';

const hosts = [
    { hook: 'weather',  host: 'wsidata.weather.com',      type: 'JSON',   controller: rootController(),   ingestURI: `${EXPRESSPROXY_DNS}:${EXPRESSPROXY_PORT}/201303/en-us/37082592/weather.json`},
    { hook: 'traffic',  host: 'wsidata.weather.com',      type: 'JSON',   controller: rootController(),   ingestURI: `${EXPRESSPROXY_DNS}:${EXPRESSPROXY_PORT}/201303/en-us/37082592/traffic.json`},
    { hook: 'lottery',  host: 'lotterynumbersxml.com',    type: 'XML',    controller: rootController(),   ingestURI: `${EXPRESSPROXY_DNS}:${EXPRESSPROXY_PORT}/`}
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