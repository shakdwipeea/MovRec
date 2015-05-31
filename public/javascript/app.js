var fs = require('fs');
/*var DataStore = require('nedb');
var db = new DataStore({
  filename: __dirname + '/movie.db',
  autoload: true
});
*/
var _ = require('lodash')

var open = require("open");

var lowdb = require('lowdb');
var db = lowdb('movie.json');

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
updateUi();

function updateUi() {
  console.log('Update ui now')
  db = lowdb('movie.json')

  var fileDatas = dbGet(function  (docs) {
    addData(docs);
  });

}

function addData (docs) {
  //console.log("Docs is " +  Object.keys(docs))

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
  
  var docs = db("movies").take(db("movies").size())
  console.log('Dbdb' +  docs.length)
  callback(docs)
  
}

/*fs.watch('movie.json', function(event, fileName) {
	updateUi();
	console.log("Event:",event)
})*/

setInterval(function  () {
  updateUi();
},5000)

/*  
ractive.observe('context', function  (newValue) {
	ractive.data = context;
})*/


function  query(event) {
  // body...
  //if (event.keyCode != 13) {return};
  console.log("Query called",event)
  var title = document.getElementById("movie").value
  console.log("Title we're searching" + title)

  var docs = db("movies").take(db("movies").size())

  var newDocs= _.filter(docs, function  (doc) {
      var x = new RegExp(title, 'i')
      if(doc.name.match(x)) {
        return true
      }
   })

  console.log(typeof newDocs)

  addData(newDocs)

  //call addData with docs
}

function play (video) {
  console.log("Open called")
  open(video.path);
}
