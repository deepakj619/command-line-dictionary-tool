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
      console.log("Definiton(s) of word: "+word)
      data.forEach(function(defData) {
        var def = defData.text;
        console.log(def);
    });
    }).catch((rejection) =>{
      var error = rejection['statusCode'];
      if(error == 400){
        console.log("Word not found.Please make sure word is among 42 words.")
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
      console.log("Synonyms (s) of word: "+word)
    //   data.forEach(function(defData) {
    //     var def = defData.text;
    //     console.log(def);
    // });

    console.log(data);
    }).catch((rejection) =>{
      var error = rejection['statusCode'];
      if(error == 400){
        console.log("Word not found.Please make sure word is among 42 words.")
      }
    });
  });




program.parse(process.argv);
