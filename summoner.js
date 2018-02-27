const request = require("request");
const requestP = require("request-promise");
const privateInfo = require("./privateInfo.js");
module.exports = {
   summonerInfo: function (summoner){
     return promise = new Promise(function (resolve, reject){
       requestP(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summoner}?api_key=${privateInfo.leagueKey}`).then(function(data){
         parsedData = JSON.parse(data);
         requestP(`https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/${parsedData["id"]}?api_key=${privateInfo.leagueKey}`).then(function (data){
           parsedSummonerInfo = JSON.parse(data);
           resolve(parsedSummonerInfo);
         }).catch(function (err){
           reject(err);
         });
       }).catch(function (err){
         reject(err);
       });
     });
   }
}
