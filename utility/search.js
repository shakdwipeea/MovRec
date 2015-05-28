var fs = require('fs');
var pathLib = require('path');

var data = [];
//3721
function search (path, callback) {
	//Set up db
	if(path) {
		//console.log('***');
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
					if(stats.isDirectory()) {
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
	data.push(curVideo);

	if(!curVideo) {
		throw new Error("chutiyap")
	}

	console.log('Data is ' + curVideo)

	fs.writeFileSync(__dirname + '/../public/db.json', JSON.stringify(data))
	//updateUi();
}

module.exports = search;
