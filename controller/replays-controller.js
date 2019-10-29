//const request = require('request-promise');
const request = require('request')
const server = require('./server.json');  
const config = require('../config.json'); 

module.exports = class ReplaysController {

    static submitReplayId(id) {
        var data = { 
            "id": id,
            "maps" : config.maps
        }; 
        return new Promise(function (resolve, reject) {
            request.post(
                server.url + "/api.replays/submit",
                { json: data }, 
                (error, res, body) => {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        console.log(`statusCode: ${res.statusCode}`)
                        console.log(body)
                        resolve(body);
                    }
                })
        });
     /*
        var data = { "id": id }; 
        request.post(server.url + "/api.replays/submit", 
            { json: data }, 
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
            }
        )   
        var json = { "id": id };
        console.log("Sending: " + json);
        return new Promise(function (resolve, reject) {
            request.post(server.url + "/api.replays/submit", {json, json: true})
            .then(function (json) {
                console.log(json);
                resolve(json);
            })
            .catch(function (err) {
                reject(err);
            }); 
        });   
        */
    }
}