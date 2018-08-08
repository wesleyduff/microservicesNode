const uri_json = require( '../mappers/dist/uri_json' ),
    chalk = require('chalk');

export default () => {
    return {
        ingestAll: (progressBarDomElement) => {
            console.log(uri_json);
            //handle progressbar
            const jsonDataLength = uri_json.data.length;
            let percentage = 0;
            let count = 1;

            //loop over each user
            const promiseArray = uri_json.data.map(route => {
                const headers = new Headers();
                headers.append('x-testharness-host', route.host);
                headers.append('x-testharness-options', route.options)
                headers.append('x-testharness-ingesturi', route.ingestUri)
                headers.append('x-testharness-tablename', route.tableName);
                console.log('---- calling promise')
                return new Promise((resolve, reject) => {
                    fetch(route.serviceEndpoint, {
                        method: 'POST',
                        headers: headers
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log('---- responseJSON ', response)
                            percentage = 100 / (jsonDataLength / count);
                            progressBarDomElement.width(`${percentage}%`)
                            console.log(chalk.bgBlue(`percentage of progress bar : ${percentage}%`))
                            count++;

                            resolve({
                                response,
                                route
                            });
                        })
                        .catch(err => {
                            percentage = 100 / (jsonDataLength / count);
                            progressBarDomElement.width(`${percentage}%`)
                            console.log(chalk.bgBlue(`percentage of progress bar : ${percentage}%`))
                            count++;
                            reject({
                                route,
                                err,
                                response: '-- error fetching ingest point from other pod'
                            });
                        });
                })

            });

            return new Promise((resolve, reject) => {
                Promise.all(promiseArray)
                    .then(results => {
                        console.log('---- all results', results)
                        results.forEach(res => {
                            console.log('---- res', res)
                            resolve({
                                results
                            })
                        })
                    })
                    .catch(error => {
                        console.log('----- error from promise all', error)
                        reject({
                            error
                        })
                    })
                });
        },
        post: (host, ingestURI, options=null) => {
            return new Promise((resolve, reject) => {
                const headers = new Headers();
                headers.append('x-testharness-host', host);
                headers.append('x-testharness-options', options)
                headers.append('Content-Type', 'application/json')
                fetch(ingestURI, {
                    method: 'POST',
                    headers: headers
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(responseJSON => {
                        resolve(responseJSON)
                    })
                    .catch(err => {
                        reject( {
                            err,
                            response: '-- error fetching ingest point from other pod'
                        } );
                    });
            })
        },

        put: (req, res) => {
            return({
                response: {
                    message: 'Base put functionality',
                    code: 200
                }
            })
        },

        patch: (req, res) => {
            return({
                response: {
                    message: 'Base patch functionality',
                    code: 200
                }
            })
        },

        get: (req, res) => {
            return({
                response: {
                    message: 'Base get functionality',
                    code: 200
                }
            })

        },

        delete: (req, res) => {
            return({
                response: {
                    message: 'Base delete functionality',
                    code: 200
                }
            })
        }
    }
}

