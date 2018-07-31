const    request                =   require('request')
        ,ObjectID               =   require('mongodb').ObjectID
        ,ingestCollection       = 'weather'
        ,ingestEndpoint         = 'https://api.dev-raven.news/weather/bug/v1/';

exports.getIndex = (req, res) => {
    res.json({
        response: {
            message: 'Base weather ingest page',
            code: 200
        }
    })
}

exports.post = (req, res) => {
    const zoneID = req.params.dataID;

    request(ingestEndpoint + zoneID, (error, response, body) => {
        if(error){
            res.json({
                error,
                response: '-- error fetching ingest point : weather bug v1 : zone id' + zoneID
            })
            return;
        }

        if(response){
            const data = JSON.parse(response.body);
            req.mongoDatabase.collection(ingestCollection)
                .insertOne(data, (error, response) => {
                    if (error) {
                        res.json({error, response: 'Error: '});
                    } else {
                        res.json({response})
                    }

                })
        }
    })
}

exports.put = (req, res) => {
    res.json({
        response: {
            message: 'Base put functionality',
            code: 200
        }
    })
}

exports.patch = (req, res) => {
    res.json({
        response: {
            message: 'Base patch functionality',
            code: 200
        }
    })
}

exports.getAll = (req, res) => {

    req.mongoDatabase.collection(ingestCollection).find({}, {} ).toArray(function(error, data) {
        if (error) {
            res.json({
                error
            })
        } else {
            res.json({
                data
            })
        }
    });

}

exports.get = (req, res) => {
    const zoneID = req.params.dataID;
    req.mongoDatabase.collection(ingestCollection).find({'_id': ObjectID(zoneID)}, {} ).toArray(function(error, data) {
        if (error) {
            res.json({
                error
            })
        } else {
            res.json({
                data
            })
        }
    });

}

exports.delete = (req, res) => {
    res.json({
        response: {
            message: 'Base delete functionality',
            code: 200
        }
    })
}


