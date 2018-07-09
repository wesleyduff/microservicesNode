const app = require('express')();
const chalk = require('chalk');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const   sportsServerIp = 'sports-svc:3001',
        newsServerIp = 'news-svc:3002';


app.get('/', (req, res) => {
    res.send('Base express app : dockerized : Charter : News and Sports : RAVEN');
});

app.all("/api/news/*", (req, res) => {
    console.log('redirecting to server 1');
    apiProxy.web(req, res, {target: 'http://' + newsServerIp});
});

app.all("/api/sports/*", (req, res) => {
    console.log('redirecting to server 2');
    apiProxy.web(req, res, {target: 'http://' + sportsServerIp});
});

app.get("/api/raven/:id", (req, res) => {
    console.log(req.headers);
    const headers = req.headers.toString();
    res.json({
        headers: headers
    })
});


// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
    console.log('setting header from proxy')
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    res.set('X-Special-Header', 'baz');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(chalk.green(`Listening on port : ${port} - server running`))
})