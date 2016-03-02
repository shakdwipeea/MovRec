#!/usr/bin/env node
'use strict'

const program = require('commander');

var Kyaji = require('./Kyaji');

program
  .version('0.0.1')
  .command('search <directory>')
  .description('Search a particular directory for movies')
  .action(Kyaji.searchMovies);

program
    .command('get <title>')
    .description('Get info for a particular movie')
    .action(Kyaji.getMovie);

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
