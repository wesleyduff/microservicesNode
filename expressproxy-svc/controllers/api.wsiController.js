const   request             =   require('request'),
    ObjectID                =   require('mongodb').ObjectID,
    { encode, decode }      =   require('../helpers'),
    pgp                     =   require('pg-promise')(),
    pgPort                  =   process.env.PG_PORT || '5432',
    pgPassword              =   process.env.PG_PASSWORD || 'N5xa0K8tyN',
    pgDNS                   =   process.env.PG_DNS || '127.0.0.1',
    pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@${pgDNS}:5432/testharness`),
    trafficRegEx            =   /traffic.json/gm,
    weatherRegEx            =   /weather.json/gm,
    types                   =   {TRAFFIC: 'traffic',WEATHER: 'weather'}

let ingestURI               =   null,
    type                    =   null,
    table                   =   null;

function getTypeOfRequest(req){
    if(req.url.match(trafficRegEx)){
        type = types.TRAFFIC;
        table = types.TRAFFIC;
    } else if(req.url.match(weatherRegEx)){
        type = types.WEATHER;
        table = types.WEATHER;
    }

    if(type !== null){
        type === types.TRAFFIC ?
            ingestURI = req.ingestURI.find(uri => uri.endpoint.match(trafficRegEx))
            :
            type === types.WEATHER ?
                ingestURI = req.ingestURI.find(uri => uri.endpoint.match(weatherRegEx))
                :
                null
    }
}

exports.post = (req, res) => {
    getTypeOfRequest(req);

    if(!ingestURI){
        console.log('----failed finding ingestURI ---> api.wsiController.js')
        return false;
    }


    console.log(`ingestURL: ${ingestURI.endpoint}, : table: ${table}, : host: ${req.host}`);
    request(ingestURI.endpoint, (error, response, body) => {
        if(error){
            res.json({
                error
            })
            return;
        } else if (response.statusCode === 500){
            res.json({
                response: body
            });
            return;
        }


        const encodedString = encode(body, req.type);
        pgDatabase.none(`INSERT INTO ${table} (data, title) VALUES($1, $2)`, [ encodedString, `${table} ingest from ${req.host}`])
            .then(insertDataResponse => {
                pgDatabase.any(`SELECT * FROM ${table}`)
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
    getTypeOfRequest(req);

    if(!ingestURI){
        console.log('----failed finding ingestURI ---> api.wsiController.js')
        return false;
    }
    res.json({
        response: {
            message: 'Base put functionality',
            code: 200
        }
    })
}

exports.patch = (req, res) => {
    getTypeOfRequest(req);

    if(!ingestURI){
        console.log('----failed finding ingestURI ---> api.wsiController.js')
        return false;
    }
    res.json({
        response: {
            message: 'Base patch functionality',
            code: 200
        }
    })
}

exports.get = (req, res) => {
    getTypeOfRequest(req);

    if(!ingestURI){
        console.log('----failed finding ingestURI ---> api.wsiController.js')
        return false;
    }
    pgDatabase.any(`SELECT * FROM ${table}`)
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
    getTypeOfRequest(req);

    if(!ingestURI){
        console.log('----failed finding ingestURI ---> api.wsiController.js')
        return false;
    }

    res.json({
        response: {
            message: 'Base delete functionality',
            code: 200
        }
    })
}


