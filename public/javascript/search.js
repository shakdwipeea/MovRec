var fs = require('fs');
var pathLib = require('path');
var DataStore = require('nedb');

/* Low db */

var low = require('lowdb');
var db = low('movie.json',{
	autosave: true,
	async: false
})


var ptn = require('parse-torrent-name');
var request = require('request')
var qs = require('qs');

var comm = require('./javascript/Comm')
/*
var db = new DataStore({
	filename: __dirname+ '/../public/movie.db',
	autoload: true
});*/

var data = [];
//3721
function search (path, callback) {
	//Set up db
	if(path) {
		//console.log(path);
		fs.readdir(path, function (err, files) {
			if(err) {
				//console.log('Cannot access path', path);
			}

			else {

				for (var index = 0; index < files.length; index++) {
					var element = files[index];
					var pathElement = path + '/' + element;
					try {
						var stats = fs.lstatSync(pathElement);
					}catch(err) {
						return;
					}
					if(stats.isDirectory()){
						//Its a directory. Search Further
						search(pathElement);
					}

					else if (stats.isFile()) {
						//Its a file
						//console.log('Path Element is' , pathElement)

						var fileExtensions = pathLib.extname(pathElement);

						if(fileExtensions == '.mp4') {
							console.log('found' , pathElement)
							saveToDb(pathElement);
						}
					}

				}
			}
		});
	}
}


function saveToDb(pathElement) {
	var ele = pathElement.split('/');
	var curVideo = {
		name: ele[ele.length - 1],
		path: pathElement
	}

	getMovieDetails(curVideo, function  (curVideo) {
		data.push(curVideo);

	if(!curVideo) {
		throw new Error("chutiyap")
	}

	console.log('Data is ' + curVideo.path)
	//Write to nedb

		//console.log(Object.keys(window))
		//win.webContents.send('found', curVideo);
		comm.emit('found')


		writeToDb(curVideo);

	
	})

	
	//updateUi();
}

function writeToDb (curVideo) {
	var docs = db('movies').find({path: curVideo.path});

	console.log("We go " + docs)
			if(!docs) {
				db('movies').push(curVideo);
				db.save();
				console.log("Addedds ok")
			}
			else {
				console.log("Skippin")
			}
}

function getMovieDetails (curVideo, callback) {
	var details = ptn(curVideo.name);

	var URL = "http://www.omdbapi.com/?"

	if(details.title) {
		//Title exists good to go 
		var det = {
			t: details.title,
			plot: 'short',
			r: 'json'
		}

		curVideo.season = details.season | "NA"
		curVideo.episode = details.episode | "NA"
		curVideo.title = details.title
		callback(curVideo)

		/*var queryUrl = URL + qs.stringify(det);
		console.log("Query url is " + queryUrl)

		request.get(queryUrl, function  (err, res, body) {
			console.log("Bodyd" + body)
			if (typeof body == "string") {
				body = JSON.parse(body)
			}
			if(body.Error) {
				curVideo.rating = "Not Found"
				callback(curVideo)
			}
				var path = curVideo.path;
				curVideo = body;
				curVideo.path = path;
				console.log("Found" + curVideo.path)
				callback(curVideo);
		})*/
	}
	else  {
		curVideo.rating = "Not Found"
		console.log("Not found")
		callback(curVideo)

	}
}


search('/')
