//const request = require('request-promise');
const request = require('request')
const server = require('./server.json');  
const config = require('../config.json'); 

module.exports = class ReplaysController {

    /**
     * Submits a replay by id to the server
     */
    static submitReplayId(id) {
        var data = { 
            "id": id,               // replay id
            "maps" : config.maps    // Maps managed by the bot
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
                        resolve(body);
                    }
                })
        });
    }

    static searchReplayByUser(name) {
        var data = { 
            "name": name.toLowerCase(),
        }; 
        return new Promise(function (resolve, reject) {
            request.get(
                server.url + "/api.replays/player",
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
                }
            )
        });
    }

}