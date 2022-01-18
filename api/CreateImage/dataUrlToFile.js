const { BlobServiceClient } = require("@azure/storage-blob");

var fs = require('fs');

//const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
//const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;";
const blobContainerName = "logitemtest";

exports.saveDataURL = async function( context, req, filename, dataurl ){
	var info = parseDataURL( dataurl );
	var chunk = info.isBase64
		? new Buffer.from(info.data, 'base64')
		: new Buffer.from( decodeURI ( info.data ), 'binary');
	
	// 一時フォルダへ書き込み
	fs.writeFile(process.env.TEMP + "/" + filename, chunk, function (err) {
    	console.log(err);
	});
	
	// Azure Blob Storageへ保存
	const upload = async() => {
		try{
			const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
			var blobContainerClient = blobServiceClient.getContainerClient(blobContainerName);
			var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
			await blockBlobClient.upload(chunk, Buffer.byteLength(chunk));	
			console.log(`Blob "${filename}" is uploaded`);		
		}catch{
			(err) => {cd .
				console.log("Error:", err.message);
			}
		};
	}

	upload();

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