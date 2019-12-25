const apiKey = "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";
const baseApiHost = 'https://fourtytwowords.herokuapp.com'

var request = require("request-promise");


var propertiesObject = {api_key:apiKey};

module.exports.getDefOfWordApi = async  (word) =>{

    var url = baseApiHost+"/word/"+word+"/definitions"
    var result = await request({url:url, qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
      });
    return new Promise((resolve,rejection) =>{
      return resolve(result);
    });
}


module.exports.getRelatedWordsApi = async (word) =>{

  var url = baseApiHost+"/word/"+word+"/relatedWords"
  var result = await request({url:url, qs:propertiesObject}, function(err, response, body) {
      if(err) { console.log(err); return; }
    });
  return result;
}

module.exports.getExamplesApi = async (word) =>{

  var url = baseApiHost+"/word/"+word+"/examples"
  var result = await request({url:url, qs:propertiesObject}, function(err, response, body) {
      if(err) { console.log(err); return; }
    });
  return result;
}


module.exports.getRandomWordApi = async () =>{

  var url = baseApiHost+"/words/"+"randomWord"
  var result = await request({url:url, qs:propertiesObject}, function(err, response, body) {
      if(err) { console.log(err); return; }
    }); 
  return result;
}


