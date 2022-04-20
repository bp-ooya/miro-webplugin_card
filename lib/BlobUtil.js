const { BlobServiceClient } = require('@azure/storage-blob')

// アプリケーションで使用する接続文字列を取得
const _connectionString = process.env.AzureWebJobsStorage
// コンテナークライアントの作成に使用されるBlobServiceClientオブジェクトを作成
const _blobServiceClient = BlobServiceClient.fromConnectionString(_connectionString)
// コンテナーへの参照を取得
let _containerClient = undefined

const CON_IMAGE = `logitemimage`
const CON_TEMP = `logitemimagetemp`

const ex = {
  getContainerName() {
    return CON_IMAGE
  },

  getTempContainerName() {
    return CON_TEMP
  },

  connection() {
    return {
      client: _blobServiceClient,
      container: _containerClient
    }
  },
  container(containerName) {
    _containerClient = _blobServiceClient.getContainerClient(containerName)
    return this
  },

  async delete(blobName) {
    // blobを削除
    await _containerClient.deleteBlob(blobName)
  },
  async upload(blobName, data) {
    // Get a block blob client
    const blockBlobClient = _containerClient.getBlockBlobClient(blobName)
    const uploadBlobResponse = await blockBlobClient.upload(data, Buffer.byteLength(data))

    return uploadBlobResponse
  },
  async download(blobName, binary = true) {
    const blobClient = _containerClient.getBlobClient(blobName)
    const downloadBlockBlobResponse = await blobClient.download(0)
    const downloaded = binary
      ? await _streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
      : await _streamToString(downloadBlockBlobResponse.readableStreamBody)
    return downloaded
  }
}

// A helper method used to read a Node.js readable stream into a Buffer
async function _streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data))
    })
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
    readableStream.on('error', reject)
  })
}

async function _streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    readableStream.on('data', (data) => {
      chunks.push(data.toString())
    })
    readableStream.on('end', () => {
      resolve(chunks.join(''))
    })
    readableStream.on('error', reject)
  })
}

module.exports = ex
