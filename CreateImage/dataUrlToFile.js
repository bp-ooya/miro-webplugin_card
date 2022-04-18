const { BlobServiceClient } = require("@azure/storage-blob");

var fs = require("fs");

const connectionString = process.env.AzureWebJobsStorage;
const blobContainerName = "logitemimage";
const blobContainerNameTemp = "logitemimagetemp";

exports.saveDataURL = async function (context, req, filename, dataurl) {
  var info = parseDataURL(dataurl);
  var chunk = new Buffer.from(info, "base64");

  // Azure Blob Storageへ保存

  // 一時Storage(外部から閲覧可能：処理完了後画像削除する)
  const uploadTemp = async () => {
    try {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      var blobContainerClient = blobServiceClient.getContainerClient(
        blobContainerNameTemp
      );
      var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
      await blockBlobClient.upload(chunk, Buffer.byteLength(chunk));
      context.log(`Blob "${filename}"(Temp) is uploaded`);
    } catch (err) {
      context.log("Error:", err.message);
    }
  };

  // 保存Storage(外部から閲覧不可)
  const upload = async () => {
    try {
      const blobServiceClient =
        BlobServiceClient.fromConnectionString(connectionString);
      var blobContainerClient =
        blobServiceClient.getContainerClient(blobContainerName);
      var blockBlobClient = blobContainerClient.getBlockBlobClient(filename);
      await blockBlobClient.upload(chunk, Buffer.byteLength(chunk));
      context.log(`Blob "${filename}" is uploaded`);
    } catch (err) {
      context.log("Error:", err.message);
    }
  };

  await uploadTemp();
  upload();
};

// DataURLからデータ部分のみ抽出
parseDataURL = function (dataURL) {
  var regx = new RegExp("^data:([^;]+)(;charset=([^,;]+))?(;base64)?,(.*)");
  if (regx.test(dataURL)) {
    var data = dataURL.match(regx)[5];
    return data;
  } else {
    return "";
  }
};
