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
    { host: 'localhost',                    type: 'JSON',   controller: apiController },
    { host: 'api.ap.org',                   type: 'JSON',   controller: apiApOrgController },
    { host: 'web.schenectady.k12.ny.us',    type: 'JSON',   controller: webSchenectadyK12NyUsController },
    { host: 'schoolclosingsnetwork.com',    type: 'JSON',   controller: schoolclosingsnetworkController },
    { host: 'lotterynumbersxml.com',        type: 'JSON',   controller: lotterynumbersxmlController },
    { host: 'spectrumlocalnews.com',        type: 'JSON',   controller: spectrumlocalnewsController },
    { host: 'syndication.ap.org',           type: 'JSON',   controller: syndicationController },
    { host: 'api.stats.com',                type: 'JSON',   controller: apiStatsController },
    { host: 'tickertech.com',               type: 'JSON',   controller: tickertechController },
    { host: 'wsidata.weather.com',          type: 'JSON',   controller: wsidataWeatherController },
    { host: 'web.mta.info',                 type: 'JSON',   controller: webMtaController },
    { host: 'njtransit.com',                type: 'JSON',   controller: njtransitController },
    { host: 'rss.paalerts.com',             type: 'JSON',   controller: rssPaalertsController },
    { host: 'data-services.wsi.com',        type: 'JSON',   controller: dataServicesWsiController },
    { host: 'madis-data.ncep.noaa.gov',     type: 'JSON',   controller: madisDataNcepNoaaController }
];

module.exports = (host) => {
    const foundHost = hosts.find(item => item.host.toLowerCase() === host.toLowerCase());
    if(!foundHost){
        return hosts[0];
    } else {
        return foundHost;
    }
}