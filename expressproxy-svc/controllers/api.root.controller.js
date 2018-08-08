const   request             =   require('request'),
    { encode, decode }      =   require('../helpers'),
    pgp                     =   require('pg-promise')(),
    pgPort                  =   process.env.PG_PORT || '5432',
    pgPassword              =   process.env.PG_PASSWORD || 'OWPuQDQTJC',
    //pgDNS                   =   process.env.PG_DNS || '127.0.0.1',
    pgDNS                   =   process.env.NODE_ENV === 'dev' ? process.env.PG_DNS : '127.0.0.1',
    pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@${pgDNS}:5432/testharness`),
    chalk                   =   require('chalk');


exports.post = (req, res) => {
    console.log(`postgres://postgres:${pgPassword}@${pgDNS}:5432/testharness ::: api root controller ----> ingestURL: ${req.ingestURI}, : table: ${req.table}, : host: ${req.host}`);
    request(req.ingestURI, (error, response, body) => {
        if(error){
            res.json({
                error
            })
            return;
        } else if(response.statusCode !== 200){
            console.log(chalk.magenta(`---- response status code not 200: ${response.statusCode} : req.ingestURI : ${req.ingestURI}`));
            res.json({
                error: 'Status code was not 200',
                response,
                ingestURI: req.ingestURI
            })
            return;
        }

        const   options     = req.options || '';
        let     dataToSave  = null,
                type        = null,
                tableColumnType = null;


        if(response.headers['content-type'].match(/xml/)){
            type = 'xml';
            tableColumnType = 'text';
        }

        if(response.headers['content-type'].match(/json/)){
            type = 'json';
            tableColumnType = 'jsonb';
        }

        if(type === 'xml'){
            dataToSave = encode(body, req.type);
        }
        dataToSave = dataToSave || body;
        pgDatabase.none(`CREATE TABLE IF NOT EXISTS ${req.table} (datatype varchar(10), ingestcreator varchar(255), title varchar(255), created date DEFAULT now(), data ${tableColumnType}, options text)`)
            .then(createTableResult => {
                pgDatabase.none(`INSERT INTO ${req.table} (datatype, ingestcreator, data, options, title) VALUES($1, $2, $3, $4, $5)`, [type, req.host, dataToSave, options, `${req.table} ingest from ${req.host}`])
                    .then(insertDataResponse => {
                        pgDatabase.any(`SELECT * FROM ${req.table}`)
                            .then(function (resultFromGet) {
                                let returnData = { data: []};
                                resultFromGet.forEach(item => {
                                    returnData.data.push({datatype: item.datatype, createdDate: item.created, title: item.title, data: item.datatype === 'xml' ? decode(item.data) : item.data, options: item.options})
                                })
                                res.json(returnData)
                            })
                            .catch(function (error) {
                                console.log(chalk.pink('ERROR - select from db:', error))
                                res.json('error : ' + error)
                            })
                    })
                    .catch(error => {
                        console.log(chalk.bgRed('ERROR -- insert error:', error)); // print error;
                        res.json({
                            error
                        })
                    });
            })
            .catch(error => {
                console.log(chalk.bgGreen(`ingestURI : ${req.ingestURI}, : table: ${req.table} , : table column type: ${tableColumnType} : content-type : ${response.headers['content-type']}`))
                console.log(chalk.bgMagenta('---- ERROR - create table error : \n', error));
                res.json({
                    error
                })
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

exports.get = (req, res) => {
    let type        = null;


    pgDatabase.any(`SELECT * FROM ${req.table}`)
        .then(function (resultFromGet) {
            let returnData = { data: []};
            resultFromGet.forEach(item => {
                returnData.data.push({datatype: item.datatype, createdDate: item.created, title: item.title, data: item.datatype === 'xml' ? decode(item.data) : item.data, options: item.options})
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


