var fs = require('fs');
var client = require('./s3-client');
var multipart = require("parse-multipart");

exports.saveDataURL = function( req, filename, dataurl ){
	var info = parseDataURL( dataurl );
	var boundary = multipart.getBoundary(req.headers["context-type"]);
	var chunk = info.isBase64
		? new Buffer.from(info.data, 'base64')
		: new Buffer.from( unescape( info.data ), 'binary');
		
	var parts = multipart.Parse(chunk, boundary);
	fs.writeFile('/tmp/'+filename, chunk, function (err) {
    	console.log(err);
	});
	
	// S3に保存
	client.putObject(
        {
            'ACL': 'bucket-owner-full-control',
            'Key': filename,
            'ContentType': 'image/jpeg',
            'Body': chunk,
        },
        function (error, data) {
            if (error === null) {
            } else {
		    	console.log(err);
            }
        }
	);
}

parseDataURL = function( dataURL ){
	var rslt = {
			mediaType : null,
			encoding : null,
			isBase64 : null,
			data : null
		};
	if( /^data:([^;]+)(;charset=([^,;]+))?(;base64)?,(.*)/.test( dataURL ) ) {
		rslt.mediaType = RegExp.$1 || 'text/plain';
		rslt.encoding  = RegExp.$3 || 'US-ASCII';
		rslt.isBase64  = String(RegExp.$4) === ';base64';
		rslt.data      = RegExp.$5;
	}
	return rslt;
}