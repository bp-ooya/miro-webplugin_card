const { BlobServiceClient } = require("@azure/storage-blob");

//const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
//const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const connectionString = process.env.AzureWebJobsStorage;

module.exports = async function (context, req) {
  context.log("HTTP trigger function processed a request.");

  var filename = context.bindingData.filename;
  var blobContainerName =
    req.query.temp === "true" ? "logitemimagetemp" : "logitemimage";
  let encodedData;

  // Azure Blob Storageより取得
  const downloadImage = async () => {
    try {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      var blobContainerClient =
        blobServiceClient.getContainerClient(blobContainerName);
      var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
      var downloadBlockBlobResponse = await blockBlobClient.download(0);
      encodedData = await streamToBuffer(
        downloadBlockBlobResponse.readableStreamBody
      );

      context.log(`Blob "${filename}" is downloaded`);
    } catch (error) {
      context.log("Error:", error.message);
    }
  };

  await downloadImage();

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
    isRaw: true,
    headers: {
      "Content-Type": "image/png",
    },
    body: new Uint8Array(encodedData),
  };

  return context.res;
};
