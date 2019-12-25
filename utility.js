const controller = require('./controller.js');
const colors = require('colors');
const { prompt } = require('inquirer'); 


module.exports.guessWord =(correctWords,questions) => {

  prompt(questions[0]).then( answers => {

    if (correctWords.indexOf(answers['word']) > -1) {

      console.log(""+colors.green("You WON !!!"));
      process.exit(0);
    }
    else{
      this.failedAttempt(correctWords,questions);
    }
  })
}

module.exports.failedAttempt = async (correctWords,questions) => {

  prompt(questions[1]).then( answers => {

    var choice = answers['choice'];
    if(choice == "1"){

      this.guessWord(correctWords,questions);
    }
    else if(choice == "2"){

      var ans =correctWords[0];
      var hint = correctWords[Math.floor(Math.random()*correctWords.length)]
      if(hint!=correctWords[0]){

        console.log("This word can also be called "+hint);
        this.guessWord(correctWords,questions);
      }
      else{
        var shuffled = ans.split('').sort(function(){return 0.5-Math.random()}).join('');
        console.log("The correct word is jumbled to "+shuffled);
        this.guessWord(correctWords,questions);
      }
    
    }
    else if(choice == "3"){

      var ans = correctWords[0];
      console.log("The correct word was "+colors.rainbow(ans));

      this.getDefOfWord(ans).then(res => {


        if(res == "DONE"){

          console.log(""+colors.green("Thanks for Playing...."));
          console.log(""+colors.red("Exiting....."));
        }
      });
    }
  });
}

module.exports.getPlayDataOfRandomWord= async ()=> {
  return new Promise((resolve,rejction) =>{

    var randomWord;
    var correctWords = [];
    controller.getRandomWordApi().then( res => {

      var data = JSON.parse(res);
      randomWord = data['word'];
      correctWords.push(randomWord);
      controller.getRelatedWordsApi(randomWord).then(res=>{

        var data = JSON.parse(res);
        data.forEach(function(synonData) {

          var relationType = synonData.relationshipType;
          if(relationType == "synonym"){
    
              var synonyms  = synonData['words'];
              hasSynonyms = true;
              synonyms.forEach(synonym => {
                correctWords.push(synonym);
              });
          }
        });
        return resolve(correctWords);
      });
  });
})
}

module.exports.getDefOfWord = async (word) =>{

  return new Promise((resolve,reject) => {

    controller.getDefOfWordApi(word).then(res =>{

      var data = JSON.parse(res);
      console.log("Definiton(s) of word: "+colors.bold.green(word));
      console.log("===============================");
      data.forEach(function(defData) {
        var def = defData.text;
        console.log(def);
    });
    resolve("DONE")
    console.log("=================================");
    }).catch((rejection) =>{
      var error = rejection['statusCode'];
      if(error == 400){
        console.log("Word not found.Please make sure word is among 42 words.");
        console.log("===================");
      }
    });

  })
   
}

module.exports.getSynOfWord = async (word) =>{
controller.getRelatedWordsApi(word).then(res =>{

    var data = JSON.parse(res);
    console.log("Synonyms (s) of word: "+colors.bold.green(word));
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

    console.log("No synonym founnd for this word: "+colors.bold.red(word));
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
        console.log("Antonyms (s) of word: "+colors.bold.green(word));
        var hasAntonyms = false;
        console.log("=================================");
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
  
        console.log("No Antonym founnd for this word: "+colors.bold.red(word));
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
        console.log("Example(s) of usage of word: "+colors.bold.red(word));
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

    this.getDefOfWord(word).
    then((state => {

      if(state == "DONE"){
        
        this.getSynOfWord(word);
      }
    })).
    then(this.getAntWord(word)).
    then(this.getExUsageofWord(word))
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