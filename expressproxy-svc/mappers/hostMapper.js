const {
    apiController,
    syndicationController,
    spectrumlocalnewsController,
    schoolclosingsnetworkController,
    lotterynumbersxmlController,
    apiApOrgController,
    webSchenectadyK12NyUsController,
    apiStatsController,
    tickertechController,
    wsidataWeatherController,
    webMtaController,
    njtransitController,
    rssPaalertsController,
    dataServicesWsiController,
    madisDataNcepNoaaController
} = require('../controllers');

const hosts = [
    { host: 'localhost',                          type: 'JSON',   controller: apiController,                        ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.api.ap.org',                   type: 'JSON',   controller: apiApOrgController,                   ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.web.schenectady.k12.ny.us',    type: 'JSON',   controller: webSchenectadyK12NyUsController,      ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.schoolclosingsnetwork.com',    type: 'JSON',   controller: schoolclosingsnetworkController,      ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.lotterynumbersxml.com',        type: 'JSON',   controller: lotterynumbersxmlController,          ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.spectrumlocalnews.com',        type: 'JSON',   controller: spectrumlocalnewsController,          ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.local.syndication.ap.org',     type: 'JSON',   controller: syndicationController,                ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.api.stats.com',                type: 'JSON',   controller: apiStatsController,                   ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.tickertech.com',               type: 'JSON',   controller: tickertechController,                 ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'wsidata.weather.com',          type: 'JSON',   controller: wsidataWeatherController,             ingestUri: 'http://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.web.mta.info',                 type: 'JSON',   controller: webMtaController,                     ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.njtransit.com',                type: 'JSON',   controller: njtransitController,                  ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.rss.paalerts.com',             type: 'JSON',   controller: rssPaalertsController,                ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.data-services.wsi.com',        type: 'JSON',   controller: dataServicesWsiController,            ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' },
    { host: 'local.madis-data.ncep.noaa.gov',     type: 'JSON',   controller: madisDataNcepNoaaController,          ingestUri: 'https://wsidata.weather.com/201303/en-us/37082592/traffic.json' }
];

module.exports = (host) => {
    const foundHost = hosts.find(item => item.host.toLowerCase() === host.toLowerCase());
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}