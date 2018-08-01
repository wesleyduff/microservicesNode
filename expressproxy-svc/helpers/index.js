const exportList = {};
exportList.getHost = (req) => {
    const host = req.headers.host;
    return host.substring(0, host.indexOf(":"));
}
exportList.encode = (JSONString) => {
    return Buffer.from(JSONString).toString('base64');
}
exportList.decode = (base64String) => {
    return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
}
module.exports = exportList;