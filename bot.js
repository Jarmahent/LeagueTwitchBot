const tmi = require("tmi.js");
const privateInfo = require("./privateInfo.js");
const summoner = require("./summoner.js");

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "jarmahent",
        password: privateInfo.twitchPassword
    },
    channels: ["jarmahent"]
};

var client = new tmi.client(options)
client.connect();
console.log("connection");
client.on('chat', function(channel, userstate, message, self){
  const array = message.split(' ');
  const command = array[0];
  const args = array.slice(1);
  console.log(command);
  if(!command.startsWith("!")) return;

  switch(command){
    default:
      client.action(channel, "I dont know that command. ");
      break;
    case '!summoner':
      var name = String(args.join(' '));
      summoner.summonerInfo(name).then(function(summoner){ //Use pastebin api to paste formatted table to twitch chat
        client.action(channel, `Rank: ${summoner[0]['tier']} ${summoner[0]['rank']} Wins: ${summoner[0]['wins']} Losses: ${summoner[0]['losses']}`);
      }).catch(function (error){
        client.action(channel, "Either summoner was not found or there was an API error");
        console.log(error);
      });
  }

});
