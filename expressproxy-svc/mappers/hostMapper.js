const {
    rootController,
    wsiController,
    newsEventsController
} = require('../controllers');

const hosts = [
    { host: 'wsidata.weather.com',      table: '?',         type: 'JSON',   controller: wsiController,              ingestUri: [
                                                                                                                                {type: 'traffic', endpoint: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json'},
                                                                                                                                {type: 'weather', endpoint: 'https://wsidata.weather.com/201303/en-us/37082592/weather.json'}
                                                                                                                                ]},
    { host: 'lotterynumbersxml.com',    table: 'lottery',   type: 'xml',    controller: rootController,             ingestUri: 'http://www.lotterynumbersxml.com/lotterydata/charter.com/jkhadg832/lottery_US_only.xml' },
    { host: 'spectrumlocalnews.com',    table: 'events',    type:'JSON',    controller: rootController,             ingestUri: 'https://spectrumlocalnews.com'},
    { host: 'rss.paalerts.com',         table: 'paalerts',  type:'xml',     controller: rootController,             ingestUri: 'http://rss.paalerts.com/rss.aspx'}
];

module.exports = (host) => {
    console.log('---host ', host)
    const foundHost = hosts.find(item => item.host.toLowerCase() === host.toLowerCase());
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}