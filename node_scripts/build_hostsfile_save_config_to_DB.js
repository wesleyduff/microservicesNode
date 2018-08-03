const fs = require('fs');
const URL = require('url-parse');
const request = require('request'),
    pgp                     =   require('pg-promise')(),
    pgPort                  =   '5432',
    pgPassword              =   'OWPuQDQTJC',
    pgDNS                   =   '127.0.0.1',
    pgDatabase              =   pgp(`postgres://postgres:${pgPassword}@${pgDNS}:${pgPort}/testharness`);

'use strict'

let urlsFromFile = require('./urls.json'),
    jsonUrl = {data: [] },
    hostFileText = '',
    JSONdataFromPG = null;

process.env.LOCATION === 'local' ? initLocal() : initFromPG();


function initLocal(){
    let JSONtoSaveToPG = pushJsonURLs(urlsFromFile);
    let hostFileTextToSaveToPG = createHostFileFromFile(JSONtoSaveToPG, '127.0.0.1');
    insertConfig('configs', JSON.stringify(jsonUrl), hostFileTextToSaveToPG);
    getLatestConfigFromConfigsTable('configs');
}

function initFromPG(){
    getLatestConfigFromConfigsTable('configs')
        .then(result => {
            if(result.error){
                console.log('---- error from : get latest config from PG', response.error);
                return false;
            }
            createHostFileFromFile(result.data, '127.0.0.1');
            try{
                writeJSONdataToFile(result.data);
            }
            catch(exception){
                console.log('---- exception : writing to file', exception);
            }
        });
}

function writeJSONdataToFile(json){

    fs.writeFile('_urlsFromPG.txt', JSON.stringify(json), function(err){
        if(err){
            console.log('---- error writing json file');
            return false;
        }

        console.log('---- done writing JSON file ---- ');

        return true;
    })
}

function pushJsonURLs(urlsFromFile){
    urlsFromFile.items.forEach(item => {
        const _url = new URL(item.url);
        const host = _url.host;
        console.log('---> host', host);

        jsonUrl.data.push({url: _url, table: item.table, apikey: item.apikey, apisecret: item.apisecret});
    });
    return jsonUrl;
};

function createHostFileFromFile(itemlist, IP){
    itemlist.data.forEach(item => {
        hostFileText = hostFileText.concat(`${IP}  ${item.url.host} \n`);
    })

    fs.writeFile('_hosts.txt', hostFileText, function(err){
        if(err) {
            console.log('-err writing file', err);
            return;
        }

        console.log('--- DONE ---');
    })

    console.log(JSON.stringify(itemlist, null, 2));

    return hostFileText;
}

function getLatestConfigFromConfigsTable(table){
    return pgDatabase.any(`SELECT * FROM ${table} order by createdate desc fetch first 1 rows only`)
        .then(function (response) {

            JSONdataFromPG = response[0].jsonurllist//.replace(/\\/g, '')

            return {
                response,
                data: JSONdataFromPG
            }
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            return {
                response: error,
                error
            }
        })
}

function insertConfig(table, jsonUrls, hosttext){
    pgDatabase.none(`INSERT INTO ${table} (hostfile, jsonurllist) VALUES($1, $2)`, [ hosttext, jsonUrls])
        .then(function(insertDataResponse) {
            pgDatabase.any(`SELECT * FROM ${table}`)
                .then(function (resultFromGet) {
                    return {
                        response: resultFromGet
                    }
                })
                .catch(function (error) {
                    console.log('ERROR:', error)
                    return {
                        response: error,
                        error
                    }
                })
        })
        .catch(function(error){
            return {
                response: error,
                error
            }
        })
}

function callEachIngestEndpoint(jsonUrls){

}