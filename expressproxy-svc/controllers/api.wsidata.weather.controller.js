const   request                 =   require('request'),
        ObjectID                =   require('mongodb').ObjectID,
        { encode, decode }      =   require('../helpers'),
        pgp                     =   require('pg-promise')(),
        pgPort                  =   process.env.PG_PORT || '5432',
        pgPassword              =   process.env.PG_PASSWORD || 'N5xa0K8tyN',
        pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@postgres-postgresql.default.svc.cluster.local:${pgPort}/wsidata`)


exports.getIndex = (req, res) => {
    res.json({
        response: {
            message: 'Base weather ingest page',
            code: 200
        }
    })
}

exports.post = (req, res) => {
    request(req.ingestURI, (error, response, body) => {
        if(error){
            res.json({
                error,
                response: '-- error fetching ingest point : weather bug v1 : zone id'
            })
            return;
        }

        const encodedString = encode(body);
        pgDatabase.none('INSERT INTO weather(data, title) VALUES(${encodedString}, ${title})', {
            encodedString: encodedString,
            title: `Weather ingest from ${req.host}`
        });

        pgDatabase.any('SELECT * FROM weather')
            .then(function (data) {
                const result = JSON.stringify(data[0]);
                res.json(result)
            })
            .catch(function (error) {
                console.log('ERROR:', error)
                res.json('error : ' + error)
            })



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

    res.json({
        response: {
            message: 'Base get all functionality',
            code: 200
        }
    })

}

exports.get = (req, res) => {
    res.json({
        response: {
            message: 'Base get functionality',
            code: 200
        }
    })

}

exports.delete = (req, res) => {
    res.json({
        response: {
            message: 'Base delete functionality',
            code: 200
        }
    })
}


