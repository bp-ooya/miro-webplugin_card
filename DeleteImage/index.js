const blobUtil = require('../lib/BlobUtil.js')

//const connectionString = process.env.AzureWebJobsStorage;

module.exports = async function (context) {
  context.log('HTTP trigger function processed a request.')

  var filename = context.bindingData.filename

  // Azure Blob Storageより削除
  const deleteFile = async () => {
    try {
      blobUtil.container(blobUtil.getTempContainerName())
      await blobUtil.delete(filename)
      context.log(`Blob "${filename}" is deleted`)
    } catch (error) {
      context.log('Error:', error.message)
    }
  }

  await deleteFile()

  context.res = {
    // status: 200, /* Defaults to 200 */
    status: 200,
    body: 'OK'
  }
}
