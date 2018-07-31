const   apiController                   = require('./api.server.controller'),
        schoolclosingsnetworkController = require('./api.schoolclosingsnetwork.controller'),
        spectrumlocalnewsController     = require('./api.spectrumlocalnews.controller'),
        syndicationController           = require('./api.syndication.ap.org.controller'),
        lotterynumbersxmlController     = require('./api.lotterynumbersxml.controller'),
        apiApOrgController              = require('./api.ap.org.controller' ),
        webSchenectadyK12NyUsController = require('./api.web.schenectady.k12.ny.us.controller'),
        apiStatsController              = require('./api.stats.controller'),
        tickertechController            = require('./api.tickertech.controller'),
        wsidataWeatherController        = require('./api.wsidata.weather.controller'),
        webMtaController                = require('./api.web.mta.info.controller'),
        njtransitController             = require('./api.njtransit.controller'),
        rssPaalertsController           = require('./api.rss.paalerts.controller'),
        dataServicesWsiController       = require('./api.data-services.wsi.controller'),
        madisDataNcepNoaaController     = require('./api.madis-data.ncep.noaa.controller')


module.exports = {
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
};