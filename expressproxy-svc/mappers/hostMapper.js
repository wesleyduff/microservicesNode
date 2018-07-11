const ipAddresses = require('../constants');
const hosts = [
    {host: "rdstest.com", target: `http://${ipAddresses.RDSIp}`},
    {host: "doctest.com", target: `http://${ipAddresses.DOCIp}`},
    {host: "pushstring.com", target: `http://${ipAddresses.PUSHIp}`},
    {host: "pushdoc.com", target: `http://${ipAddresses.PUSHIp}`},
    {host: "internal.com", target: `http://${ipAddresses.INTERNALIp}`}
]
module.exports = (host) => {
    const foundHost = hosts.find(item => item.host.toLowerCase() === host.toLowerCase());
    if(!foundHost){
        return hosts[2];
    } else {
        return foundHost;
    }
}