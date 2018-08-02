export default () => {
    return {
        post: (host, ingestURI) => {
            return new Promise((resolve, reject) => {
                const headers = new Headers();
                headers.append('x-testharness-host', host);
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
                            response: '-- error fetching ingest point : weather bug v1 : zone id'
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

