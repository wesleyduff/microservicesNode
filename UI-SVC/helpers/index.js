const exportList = {};
exportList.encode = (JSONString) => {
    return Buffer.from(JSONString).toString('base64');
}
exportList.decode = (base64String) => {
    return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
}
module.exports = exportList;
