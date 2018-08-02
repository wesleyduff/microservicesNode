const   request             =   require('request'),
    ObjectID                =   require('mongodb').ObjectID,
    { encode, decode }      =   require('../helpers'),
    pgp                     =   require('pg-promise')(),
    pgPort                  =   process.env.PG_PORT || '5432',
    pgPassword              =   process.env.PG_PASSWORD || 'N5xa0K8tyN',
    pgDNS                   =   process.env.PG_DNS || '127.0.0.1',
    pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@${pgDNS}:${pgPort}/testharness`)


exports.post = (req, res) => {
    console.log(`ingestURL: ${req.ingestURI}, : table: ${req.table}, : host: ${req.host}`);
    request(req.ingestURI, (error, response, body) => {
        if(error){
            res.json({
                error
            })
            return;
        }


        const encodedString = encode(body, req.type);
        pgDatabase.none(`INSERT INTO ${req.table} (data, title) VALUES($1, $2)`, [ encodedString, `${req.table} ingest from ${req.host}`])
            .then(insertDataResponse => {
                pgDatabase.any(`SELECT * FROM ${req.table}`)
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
    pgDatabase.any(`SELECT * FROM ${req.table}`)
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


