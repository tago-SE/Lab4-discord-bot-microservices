const request = require('request')
const server = require('./server.json');  
const config = require('../config.json'); 

module.exports = class UsersController {

    /**
     * Queries the server for a user by name
     * @param {*} name 
     */
    static getUserByName(name) {
        var data = { 
            "name": name,
            "includeRank" : true
        }; 
        return new Promise(function (resolve, reject) {
            request.get(
                server.url + "/api.users/name",
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

    static searchForUsersByName(search) {
        var data = { 
            "name": search,
        }; 
        return new Promise(function (resolve, reject) {
            request.get(
                server.url + "/api.users/search",
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