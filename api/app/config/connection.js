const elasticsearch = require("elasticsearch");

const index = 'blog'
const type = 'article'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({host:{host, port}})

async function checkConnection () {
    let isConnected = false
    while (!isConnected) {
      console.log('Connecting to ES')
      try {
        const health = await client.cluster.health({})
        console.log(health)
        isConnected = true
      } catch (err) {
        console.log('Connection Failed', err)
      }
    }
  }

async function resetIndex () {
    if (await client.indices.exists({ index })) {
      await client.indices.delete({ index })
    }
  
    await client.indices.create({ index })
    await dataMapping()
  }

async function dataMapping () {
    const schema = {
        title: { type: 'keyword' },
        text: { type: 'text' }
    }
    return client.indices.putMapping({ index, body: { properties: schema } })
}

module.exports = {
    client, index, type, checkConnection, resetIndex
}

checkConnection()
