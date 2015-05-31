var fs = require('fs');
var DataStore = require('nedb');
var db = new DataStore({
  filename: __dirname + '/movie.db',
  autoload: true
});
var open = require("open");

updateUi();

function updateUi() {
  console.log('Update ui now')

  var fileDatas = dbGet(function  (docs) {
    addData(docs);
    
  });

}

function addData (docs) {
  console.log("Docs is " +  Object.keys(docs))

    console.log("Data" + docs.length)

    var fileDataDisplaySource = document.getElementById('file-display').innerHTML

    var template2 = Handlebars.compile(fileDataDisplaySource)

    var context = {
      files: docs
    };

    var html5 = template2(context);

    var d = document.getElementById('dis');

    d.innerHTML = html5;
}


function dbGet (callback) {
	// body...
	/*return fs.readFileSync(__dirname + '/db.json',{
		encoding:'utf-8'
	});*/
  
  db.find({}, function (err, docs) {
      if (err) console.log("Error" + err)
      callback(docs);
  })
  
}

fs.watch(__dirname + '/movie.db', function(event, fileName) {
	updateUi();
	console.log("Event:",event)
})

/*
ractive.observe('context', function  (newValue) {
	ractive.data = context;
})*/


function  query(event) {
  // body...
  //if (event.keyCode != 13) {return};
  console.log("Query called",event)
  var title = document.getElementById("movie").value
  console.log("Title we're searching",title)
  db.find({
    name: {
      $regex: new RegExp(title, 'i')
    }
  }, function  (err, docs) {
    console.log(err, docs)
    addData(docs);
  })
}

function play (video) {
  console.log("Open called")
  open(video.path);
}

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});