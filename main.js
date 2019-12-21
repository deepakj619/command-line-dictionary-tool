#!/usr/bin/env node

const commander = require('commander');
var msg = require('./controller.js');

const program = new commander.Command();


program
  .version('1.0.0')
  .description('Command Line Dictionary Tool');

program
  .command('dict <word>')
  .alias('defn')
  .description('Display definitions of a given word.')
  .action(function(name) {
    console.log(msg.getDefOfWord(name));
  });


program.parse(process.argv);
