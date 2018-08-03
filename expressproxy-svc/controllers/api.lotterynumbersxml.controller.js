const   request             =   require('request'),
    ObjectID                =   require('mongodb').ObjectID,
    { encode, decode }      =   require('../helpers'),
    pgp                     =   require('pg-promise')(),
    pgPort                  =   process.env.PG_PORT || '5432',
    pgPassword              =   process.env.PG_PASSWORD || 'OWPuQDQTJC',
    pgDNS                   =   process.env.PG_DNS || '127.0.0.1',
    pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@${pgDNS}:5432/testharness`)


exports.post = (req, res) => {
    request(req.ingestURI, (error, response, body) => {
        if(error){
            res.json({
                error,
                response: '-- error fetching ingest point : lottery'
            })
            return;
        }

        const encodedString = encode(body);
        pgDatabase.none('INSERT INTO lottery (data, title) VALUES($1, $2)', [ encodedString, `Lottery ingest from ${req.host}`])
            .then(insertDataResponse => {
                pgDatabase.any('SELECT * FROM weather')
                    .then(function (resultFromGet) {
                        let returnData = { data: []};
                        resultFromGet.forEach(item => {
                            returnData.data.push({createdDate: item.created, title: item.title, data: decode(item.data)})
                        })
                        res.json(returnData)
                    })
                    .catch(function (error) {
                        console.log('ERROR:', error)
                        res.json('error : ' + error)
                    })
            })
            .catch(error => {
                console.log('ERROR:', error); // print error;
                res.json('error : ' + error)
            });





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

exports.get = (req, res) => {
    pgDatabase.any('SELECT * FROM weather')
        .then(function (resultFromGet) {
            let returnData = { data: []};
            resultFromGet.forEach(item => {
                returnData.data.push({createdDate: item.created, title: item.title, data: decode(item.data)})
            })
            res.json(returnData)
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            res.json('error : ' + error)
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


