import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const { BlobServiceClient } = require("@azure/storage-blob");

var fs = require('fs');

//const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
//const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;";
const blobContainerName = "logitemtest";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('HTTP trigger function processed a request.');

    var filename = context.bindingData.filename;
    var downloadBlockBlobResponse;
    let encodedData;
    

	// Azure Blob Storageより取得
	const upload = async() => {
		try{
			const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
			var blobContainerClient = blobServiceClient.getContainerClient(blobContainerName);
			var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
			downloadBlockBlobResponse = await blockBlobClient.download(0);
            encodedData = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
            
			context.log(`Blob "${filename}" is downloaded`);		
		}catch(error){
            context.log("Error:", error.message);
        }
	}

	await upload();
    

    async function streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
        });
    }    

    context.res = {
        status: 200,
        isRaw:true,
        headers: {
            "Content-Type": "image/png"
        },
        body:new Uint8Array(encodedData)
    }


//    context.done();
    //return context.res;
    return context.res;

};

export default httpTrigger;