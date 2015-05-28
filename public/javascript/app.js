var fs = require('fs');
updateUi();

function updateUi() {
  console.log('Update ui now')

  var fileDatas = JSON.parse(dbGet());

  console.log("Data" + fileDatas.length)

  var fileDataDisplaySource = document.getElementById('file-display').innerHTML

  var template2 = Handlebars.compile(fileDataDisplaySource)

  var context = {
  	files: fileDatas
  };

  var html5 = template2(context);

  var d = document.getElementById('dis');

  d.innerHTML = html5;
}


function dbGet () {
	// body...
	return fs.readFileSync(__dirname + '/db.json',{
		encoding:'utf-8'
	});
}

fs.watch(__dirname + '/db.json', function(event, fileName) {
	updateUi();
	console.log("Event:",event)
})

/*
ractive.observe('context', function  (newValue) {
	ractive.data = context;
})*/
