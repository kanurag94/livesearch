const elasticsearch = require("elasticsearch");

// Configuration for elasticsearch client
const index = 'blog2'
const type = '_doc'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({host:{host, port}})

// Checks connection, if failed retries
async function checkConnection () {
    let isConnected = false
    while (!isConnected) {
      console.log('Connecting to ES')
      try {
        const health = await client.cluster.health({})
        console.log(health)
        isConnected = true
      } catch (err) {
        console.log('Connection Failed...', err)
      }
    }
  }

// Resets indexes for updation in dataset
async function resetIndex () {
    if (await client.indices.exists({ index })) {
      await client.indices.delete({ index })
    }
  
    await client.indices.create({ index })
  }

module.exports = {
    client, index, type, checkConnection, resetIndex
}

// Should remove this in production
checkConnection()
