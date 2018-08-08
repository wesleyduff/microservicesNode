import {
    rootController,
} from '../controllers/index';
import generatedHostMapper from './dist/uri_json';

const   EXPRESSPROXY_PORT   =   process.env.EXPRESSPROXY_PORT   ||  '8080',
        //EXPRESSPROXY_DNS    =   '/svc';
        EXPRESSPROXY_DNS    = 'http://testharness.com:8080';


export default (host) => {
    console.log('--- host host --> ', host)
    const foundHost = generatedHostMapper.data.find(item => item.host === host);
    console.log('--- found host', foundHost)
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}