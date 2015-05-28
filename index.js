var app = require('app');
var BrowserWindow = require('browser-window');
var search = require('./utility/search');
var Parallel = require('paralleljs');

require('crash-reporter').start();

var mainWindow = null;
var processWindow = null;

app.on('window-all-closed', function () {
	if(process.platform != 'darwin') {
		app.quit();
	}
})

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 400
	})

	processWindow = new BrowserWindow({
		width: 10,
		height: 10
	})

	processWindow.loadUrl('file://' + __dirname + '/public/search.html');
	processWindow.on('close', function () {
		processWindow = null;
	})


	console.log('Immediately');

	// mainWindow.openDevTools();

	mainWindow.loadUrl('file://' + __dirname + '/public/index.html');

	mainWindow.on('closed', function () {
		mainWindow = null;
	})
})
