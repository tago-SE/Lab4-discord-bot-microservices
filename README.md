

# wc3stats-backend
This project consists of a backend that is divided into a rest-api for handling client requests for the bot and a web-socket server that updates the scoreboard on the client (bot).

# End-points
## Rest-API
http://localhost:3000/api.replays/submit 
http://localhost:3000/api.users/all 
http://localhost:3000/api.users/name

## Websocket
http://localhost:3001

'scoreboard' - sends a notification when the scoreboard is updated