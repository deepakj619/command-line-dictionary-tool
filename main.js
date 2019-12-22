#!/usr/bin/env node

const commander = require('commander');
var controller = require('./controller.js');
var utility = require("./utility.js");

const program = new commander.Command();


program
  .version('1.0.0')
  .description('Command Line Dictionary Tool');

program
  .command('defn <word>')
  .alias('d')
  .description('Display definitions of a given word.')
  .action(function(word) {
      utility.getDefOfWord(word);
  });

  program
  .command('syn <word>')
  .alias('s')
  .description('Display synonyms of a given word.')
  .action(function(word) {
    utility.getSynOfWord(word);
  });

  program
  .command('ant <word>')
  .alias('a')
  .description('Displays antonyms  of a given word.')
  .action(function(word) {
   utility.getAntWord(word);
  });

  program
  .command('ex <word>')
  .alias('e')
  .description('Display examples of usage of a given word in a sentence.')
  .action(function(word) {
    utility.getExUsageofWord(word);
  });

  program
  .command('full-dict <word>')
  .alias('fd')
  .description('Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word.')
  .action(function(word){
  
      utility.getWordFullDict(word);
    
  });

  program
  .command('full-dict-random')
  .alias('fdr')
  .description('Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word.')
  .action(() =>{
    utility.getFullDictOfRandomWord();
  });


program.parse(process.argv);
