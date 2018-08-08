const uri_json = require( '../mappers/dist/uri_json' );

export default () => {
    return {
        ingestAll: () => {
            console.log(uri_json);
            //loop through and make a map of promises

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
                        .then(responseJSON => {
                            console.log('---- responseJSON ', responseJSON)
                            resolve(responseJSON)
                        })
                        .catch(err => {
                            reject({
                                err,
                                response: '-- error fetching ingest point from other pod'
                            });
                        });
                })

            });

            Promise.all(promiseArray)
                .then(results => {
                    console.log('---- all results', results)
                    results.forEach(res => {
                        console.log('---- res', res)
                    })
                })
                .catch(error => {
                    console.log('----- error from promise all', error)
                })
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

