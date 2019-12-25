#!/usr/bin/env node

const commander = require('commander');
const utility = require("./utility.js");
const colors = require('colors');

const program = new commander.Command();

const { prompt } = require('inquirer'); 


const questions = [
  {
    type : 'input',
    name : 'word',
    message : 'Guess a word ...'
  },
  {
    type : 'input',
    name : 'choice',
    message : 'Enter 1 to Try Again , Enter 2 for Hint or Enter 3 to Quit'
  },
]



program
  .version('1.0.0')
  .description('Command Line Dictionary Tool');


program
.command('play')
.alias('p')
.description('Play the guessing game !')
.action(() =>{

  prompt(questions[0]).then(answers =>{
    var guessedWord = answers['word'];
    utility.getPlayDataOfRandomWord().then(res => {
      
      var correctWords = res;
      if (correctWords.indexOf(guessedWord) > -1) {
        console.log(""+colors.green("You WON !!!"));
        process.exit(0);
      } else {
        console.log(""+colors.red("You LOST :("));
        utility.failedAttempt(correctWords,questions);
      }

    }).catch( (err) =>{
      console.log(err)
    } )
    
  })

})


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
