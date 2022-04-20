//const { BlobServiceClient } = require('@azure/storage-blob')

//const connectionString = process.env.AzureWebJobsStorage
//const blobContainerName = 'logitemimage'
//const blobContainerNameTemp = 'logitemimagetemp'

const blobUtil = require('../lib/BlobUtil.js')

exports.saveDataURL = async function (context, req, filename, dataurl) {
  var info = parseDataURL(dataurl)
  var chunk = new Buffer.from(info, 'base64')

  // Azure Blob Storageへ保存

  // 一時Storage(外部から閲覧可能：処理完了後画像削除する)
  const uploadTemp = async () => {
    try {
      blobUtil.container(blobUtil.getTempContainerName())
      await blobUtil.upload(filename, chunk)
      context.log(`Blob "${filename}"(Temp) is uploaded`)
    } catch (err) {
      context.log('Error:', err.message)
    }
  }

  // 保存Storage(外部から閲覧不可)
  const upload = async () => {
    try {
      blobUtil.container(blobUtil.getContainerName())
      await blobUtil.upload(filename, chunk)
      context.log(`Blob "${filename}" is uploaded`)
    } catch (err) {
      context.log('Error:', err.message)
    }
  }

  await uploadTemp()
  upload()
}

// DataURLからデータ部分のみ抽出
const parseDataURL = function (dataURL) {
  var regx = new RegExp('^data:([^;]+)(;charset=([^,;]+))?(;base64)?,(.*)')
  if (regx.test(dataURL)) {
    var data = dataURL.match(regx)[5]
    return data
  } else {
    return ''
  }
}
