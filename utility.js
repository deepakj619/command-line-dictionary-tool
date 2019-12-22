var controller = require('./controller.js');

module.exports.getDefOfWord = async (word) =>{

    controller.getDefOfWordApi(word).then(res =>{

        var data = JSON.parse(res);
        console.log("Definiton(s) of word: "+word);
        console.log("===============================");
        data.forEach(function(defData) {
          var def = defData.text;
          console.log(def);
      });
      console.log("=================================");
      }).catch((rejection) =>{
        var error = rejection['statusCode'];
        if(error == 400){
          console.log("Word not found.Please make sure word is among 42 words.");
          console.log("===================");
        }
      });
}

module.exports.getSynOfWord = async (word) =>{
controller.getRelatedWordsApi(word).then(res =>{

    var data = JSON.parse(res);
    console.log("Synonyms (s) of word: "+word);
    var hasSynonyms = false;
    console.log("===================");
    data.forEach(function(synonData) {

      var relationType = synonData['relationshipType'];
      if(relationType == "synonym"){

          var synonyms  = synonData['words'];
          hasSynonyms = true;
          synonyms.forEach(synonym => {
            console.log(synonym)
          });
      }
   });
  if(hasSynonyms == false){

    console.log("No synonym founnd for this word: "+word);
    console.log("===================");
    return;
  }
  console.log("===================");
  }).catch((rejection) =>{
    var error = rejection['statusCode'];
    if(error == 400){
      console.log("Word not found.Please make sure word is among 42 words.");
      console.log("===================");
    }
  });
}


module.exports.getAntWord = async (word) => {
    controller.getRelatedWordsApi(word).then(res =>{

        var data = JSON.parse(res);
        console.log("Antonyms (s) of word: "+word);
        var hasAntonyms = false;
        console.log("======================");
        data.forEach(function(antonymsnData) {
  
          var relationType = antonymsnData['relationshipType'];
          if(relationType == "antonym"){
  
              var antonyms  = antonymsnData['words'];
              hasAntonyms = true;
              antonyms.forEach(antonym => {
                console.log(antonym)
              });
          }
       });
      if(hasAntonyms == false){
  
        console.log("No Antonym founnd for this word: "+word);
        console.log("===================");
        return;
      }
      console.log("===================");
      }).catch((rejection) =>{
        var error = rejection['statusCode'];
        if(error == 400){
          console.log("Word not found.Please make sure word is among 42 words.");
          console.log("===================");
        }
      });

}

module.exports.getExUsageofWord = async (word) => {

    controller.getExamplesApi(word).then(res =>{

        var data = JSON.parse(res);
        console.log("Example(s) of usage of word: "+word);
        console.log("======================================================================");
        var examples = data['examples']
        var index = 0;
        examples.forEach(example =>{
            console.log(++index+") "+example['text']);
            console.log("======================================================================");
          });
      }).catch((rejection) =>{
        var error = rejection['statusCode'];
        if(error == 400){
          console.log("Word not found.Please make sure word is among 42 words.");
          console.log("===================");
        }
      });
}

module.exports.getWordFullDict = async (word) =>{

    this.getDefOfWord(word);
    this.getSynOfWord(word); 
    this.getAntWord(word);
    this.getExUsageofWord(word)    
}

module.exports.getFullDictOfRandomWord = async () =>{
    
    var word;
    controller.getRandomWordApi().then(data =>{
        var result = JSON.parse(data);
        word = result['word'];
        this.getDefOfWord(word);
        this.getSynOfWord(word); 
        this.getAntWord(word);
        this.getExUsageofWord(word)    
    }).catch(rejection =>{
    });
    
}