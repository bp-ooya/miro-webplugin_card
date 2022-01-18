'use strict';

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')
var dataurltofile = require('./dataUrlToFile');
//var client = require('./s3-client');
var cors = require('cors');
require('dotenv').config();

var env =  process.env;

const fs = require('fs');

const corsOption = {
  origin: [
    "http://localhost"
  ],
  credentials: true,
};

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({	extended: true,	limit: '2mb'}));
app.use(express.json({ extended: true, limit: '2mb' }));

app.use(bodyParser.json());



/*
// S3から既存画像を取得する(編集用)
app.get('/s3/*.png', function (req, res) {
        console.log('URL=' + req.url);
		client.getObject(
	        {
	            'Key': req.url.replace('/s3/','') 
	        },
		).createReadStream()
		.on('error', err => {
			res.status(500).send({ error: err })
		
		})
		.pipe(res);
		
		req.on('finish', () => {
			res.send('OK');
		});		

});
*/

/*

// 通常の画像取得(Miroから参照する場合、Herokuの一時フォルダに保存した画像を参照する
app.get('/*.png', function (req, res) {
        console.log('URL=' + req.url);
       	res.sendFile(path.resolve('/tmp/'+req.url));
});
*/

/*

// Heroku一時フォルダへ画像を保存
app.post('/', function(req, res){

	var dataurl = req.body['dataurl'];	
	var emploeeId = req.body['emploee_id'];
		
	dataurltofile.saveDataURL(emploeeId + ".png", dataurl);
	
	res.send('OK');
});
*/


/*
// Heroku一時ファイルの削除
app.delete('/*.png', function (req, res) {
console.log('delete');
console.log(req.url);
	fs.unlink(path.resolve('/tmp/'+req.url), (err) =>{
		if(err) throw err;
		console.log('ファイル削除');
	});
	res.send('OK');
});
*/


/*

let port = process.env.PORT;
if(port == null || port == ""){
	port = 3000;
}

app.listen(port, function(){
	console.log('Listening on port ' + port);
});
*/

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

	var dataurl = req.body['dataurl'];	
	var emploeeId = req.body['emploee_id'];
		
	context.log('path=' + process.env.TEMP);
	dataurltofile.saveDataURL(context, req, emploeeId + ".png", dataurl);
		
    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 200,
        body: 'OK'
    };	    

}