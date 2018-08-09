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
            foundHost = generatedRoutes.data.find(item => item.host.toLowerCase() === manager.host.toLowerCase());
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