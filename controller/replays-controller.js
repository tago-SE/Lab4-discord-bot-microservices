const request = require('request-promise');
const server = require('./server.json');   

module.exports = class ReplaysController {

    static postReplay(data) {
        return new Promise(function (resolve, reject) {
            request.post(server.url + "/api.replays/upload", {data, json: true})
            .then(function (json) {
                resolve(json);
            })
            .catch(function (err) {
                reject(err);
            }); 
        });
    }
}