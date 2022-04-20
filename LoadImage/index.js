const blobUtil = require('../lib/BlobUtil.js')

module.exports = async function (context, req) {
  context.log('HTTP trigger function processed a request.')

  var filename = context.bindingData.filename
  var blobContainerName = req.query.temp === 'true' ? blobUtil.getTempContainerName() : blobUtil.getContainerName()

  blobUtil.container(blobContainerName)

  let encodedData

  // Azure Blob Storageより取得
  const downloadImage = async () => {
    try {
      encodedData = await blobUtil.download(filename, true)
      context.log(`Blob "${filename}" is downloaded`)
    } catch (error) {
      context.log('Error:', error.message)
    }
  }

  await downloadImage()

  context.res = {
    status: 200,
    isRaw: true,
    headers: {
      'Content-Type': 'image/png'
    },
    body: new Uint8Array(encodedData)
  }

  return context.res
}
