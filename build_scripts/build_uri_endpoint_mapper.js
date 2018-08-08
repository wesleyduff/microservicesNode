const   fs      = require('fs'),
        path    = require('path'),
        Url     = require('url-parse'),
        serviceEndpoint = process.env.NODE_ENV === 'dev' ? 'http://testharness.com:8080' : '/svc';


let readStream = fs.createReadStream(path.resolve(__dirname, './list_of_uri_endpoints.txt')),
    remaining = '',
    container = {},
    _json = {data:[]};

readStream.on('data', (data) => {
    remaining += data;
    let index = remaining.indexOf('\n');
    while(index > -1) {
        let line = remaining.substring(0, index);
        remaining = remaining.substr(index + 1);
        createJson(line);
        index = remaining.indexOf('\n');
    }
});

readStream.on('end', () => {
    if(remaining.length > 0){
        createJson(remaining);
    }
    writeToFile(_json)
});

function createJson(line){
    let url = new Url(line);
    //strip www.
    url.host = url.host.replace(/www./, '');
    //get table name
    let tableName = url.host.substring(0, url.host.indexOf('.')).replace('-', '')
    //find dupe?
    const dupe = _json.data.find(urlObj => urlObj.uri === line);
    if(!dupe){
        _json.data.push({serviceEndpoint, tableName, ingestUri: line, host: url.host, options: url.pathname + url.query})
    }
}

function writeToFile(data){
    let file = path.resolve(__dirname, '../expressproxy-svc/mappers/dist/uri_json.json');
    fs.writeFile(file, JSON.stringify(data, null, 4), (error) => {
        if(error) {
            console.log('----- could not save file --- : scripts/build_uri_endpoint');
            return;
        }

        console.log('------- SAVED - uri endpoint JSON');
    });
    file = path.resolve(__dirname, '../UI-SVC/mappers/dist/uri_json.json');
    fs.writeFile(file, JSON.stringify(data, null, 4), (error) => {
        if(error) {
            console.log('----- could not save file --- : scripts/build_uri_endpoint');
            return;
        }

        console.log('------- SAVED - uri endpoint JSON');
    });

}



