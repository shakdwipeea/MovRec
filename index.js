var app = require('app');
var BrowserWindow = require('browser-window');
/*var search = require('./utility/search');
*/
	/*var Datastore = require('nedb');
	var db = new Datastore({
		filename: __dirname + '/public/movie.db',
		autoload: true
	});*/

require('crash-reporter').start();

var mainWindow = null;
var processWindow = null;
var insertDbProcessWindow = null;

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
		width: 0,
		height: 0,
		show: false	
	})

	insertDbProcessWindow = new BrowserWindow({
		width: 0,
		height: 0,
		show: false
	})

	processWindow.show = false;
	insertDbProcessWindow.show = false;

	processWindow.loadUrl('file://' + __dirname + '/public/search.html');
	processWindow.on('close', function () {
		processWindow = null;
	})

	insertDbProcessWindow.loadUrl('file://' + __dirname + '/public/insert.html');
	insertDbProcessWindow.on('close', function () {
		insertDbProcessWindow = null;
	})


	console.log('Immediately');

 	//mainWindow.openDevTools();

	mainWindow.loadUrl('file://' + __dirname + '/public/index.html');

	mainWindow.on('closed', function () {
		mainWindow = null;
	})
})
