const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AzureWebJobsStorage;
const blobContainerName = "logitemimagetemp";

module.exports = async function (context, req) {
  context.log("HTTP trigger function processed a request.");

  var filename = context.bindingData.filename;

  // Azure Blob Storageより削除
  const deleteFile = async () => {
    try {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      var blobContainerClient =
        blobServiceClient.getContainerClient(blobContainerName);
      var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
      await blockBlobClient.delete();
      context.log(`Blob "${filename}" is deleted`);
    } catch (error) {
      context.log("Error:", error.message);
    }
  };

  await deleteFile();

  context.res = {
    // status: 200, /* Defaults to 200 */
    status: 200,
    body: "OK",
  };
};
