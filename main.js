#!/usr/bin/env node

const commander = require('commander');
var controller = require('./controller.js');

const program = new commander.Command();


program
  .version('1.0.0')
  .description('Command Line Dictionary Tool');

program
  .command('defn <word>')
  .alias('d')
  .description('Display definitions of a given word.')
  .action(function(word) {

    controller.getDefOfWord(word).then(res =>{

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
  });

  program
  .command('syn <word>')
  .alias('s')
  .description('Display synonyms of a given word.')
  .action(function(word) {

    controller.getSynonymsOfWord(word).then(res =>{

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
  });

  program
  .command('ant <word>')
  .alias('a')
  .description('Displays antonyms  of a given word.')
  .action(function(word) {

    controller.getSynonymsOfWord(word).then(res =>{

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
  });











program.parse(process.argv);
