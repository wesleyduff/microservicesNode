const exportList = {};
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString('binary');
    };
}
exportList.getIngestUri = (req) => {
    if(req.headers['x-testharness-ingesturi']){
        return req.headers['x-testharness-ingesturi'];
    }
    return null;
}
exportList.getTableName = (req) => {
    if(req.headers['x-testharness-tablename']){
        return req.headers['x-testharness-tablename'];
    }
    return null;
}
exportList.getTableName = (req) => {
    if(req.headers['x-testharness-tablename']){
        return req.headers['x-testharness-tablename'];
    }
    return null;
}
exportList.getHost = (req) => {
    if(req.headers['x-testharness-host']){
        return req.headers['x-testharness-host'];
    }
    //replace www and ports
    const host = req.headers.host.substring(0, req.headers.host.indexOf(':')).replace('www.', '');
    return host;
}
exportList.getOptions = (req) => {
    if(req.headers.hasOwnProperty('x-testharness-options')){
        return req.headers['x-testharness-options'];
    } else if(req.headers.hasOwnProperty('url')){
        return req.headers.url;
    }
}
exportList.encode = (data, type) => {
    if(typeof data === 'string'){
        return btoa(data);
    } else if(type === 'JSON'){
        const JSONString = JSON.stringify(data);
        return btoa(JSONString);
    } else if(type === 'xml'){
        const xmlText = new XMLSerializer().serializeToString(data);
        return btoa(xmlText);
    }
    console.log('----- could not encode data', data)
}
exportList.decode = (data, type) => {
    //this has to be a string, If it is not a sting, then the data was added to the DB incorrectly
    if(typeof data === 'string'){
        return atob(data);
    }
    console.log('----- could not decode data', data)
}
module.exports = exportList;