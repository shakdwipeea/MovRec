'use strict'

var fs = require('fs'),
    pathLib = require('path'),
    async = require('async');

let filterExtension = (path, extensions, cb) => {
  // fs.lstat(path, (err, stats) => {
  //   if (stats.isFile() && extensions.indexOf(pathLib.extname(path)) != -1 ) {
  //     cb(true);
  //   } else {
  //     cb(false);
  //   }
  // });
  cb(true);
}

var FileOperations = {
  getFiles: (directory, extensions, callback) => {
    fs.readdir(directory, (err, files) => {
      async.filter(files, (file, cb) =>
      filterExtension(directory + '/' + file, extensions, cb),
      callback)
    });
  }
};

module.exports = FileOperations;
