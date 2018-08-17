const
    { rootController }      =   require('../controllers'),
    generatedRoutes         =   require('./dist/uri_json.json'),
    chalk                   =   require('chalk');

module.exports = (manager) => {
    let foundHost = null;
    switch(manager.type){
        case 'query':
            foundHost = generatedRoutes.data.find(item => {
                const match = item.ingestUri.toLowerCase() == manager.host.toLowerCase();
                if(match){
                    return true;
                }
            });
            break;
        case 'host':
            if(manager.host.includes('www.')){
                manager.host = manager.host.replace('www.', '')
            }
            foundHost = generatedRoutes.data.find(item => item.host == manager.host);
            break;
        default:
            console.log(chalk.bgRed('Error: manager could not check host: expressproxy-svc hostMapper.js'));
            throw new Error('manager could not check host: expressproxy-svc hostMapper.js');
            break;
    }

    if(!foundHost){
        console.log(chalk.bgRed('Error: Could not find host config : expressproxy-svc : hostMapper.js'));
        throw new Error('Error: Could not find host config : expressproxy-svc : hostMapper.js');
    } else {
        foundHost.controller = rootController;
        return foundHost;
    }
}