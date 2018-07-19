const exportList = {};
exportList.getHost = (req) => {
    const host = req.headers.host;
    return host.substring(0, host.indexOf(":"));
}

module.exports = exportList;