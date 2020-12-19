const fs = require('fs')
const path = require('path')
const csvReader = require('fast-csv')
const esConnection = require('../config/connection')

async function readCSV(filePath) {
    try{
      const titles = []
      const texts = []
      fs.createReadStream(filePath)
          .pipe(csvReader.parse({ headers: true }))
          .on('error', error => console.error(error))
          .on('data', row => {
              titles.push(row['title']);
              texts.push(row['description']);
          })
          .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`)
            insertData(titles, texts)
          });
      } catch (err) {
        console.error(err)
    }
}

// Resets old index and creates new mapping
async function updateData () {
  try {
    await esConnection.resetIndex()

    // Read all csv files in directory
    let files = fs.readdirSync('../dataset').filter(file => file.slice(-4) === '.csv')
    console.log(`Found ${files.length} Files`)

    for (let file of files) {
      console.log(`Reading File - ${file}`)
      const filePath = path.join('../dataset', file)
      readCSV(filePath)
    }
  } catch (err) {
    console.error(err)
  }
}

async function insertData (titles, texts) {
  let bulkOps = []

  for (let i = 0; i < titles.length; i++) {
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type } })
    bulkOps.push({
      title: titles[i],
      text: texts[i]
    })
    // console.log(texts[i])
    if (i > 0 && i % 500 === 0) {
      await esConnection.client.bulk({ body: bulkOps })
      bulkOps = []
      console.log(`Indexed texts ${i - 499} - ${i}`)
    }
  }
  await esConnection.client.bulk({ body: bulkOps })
  console.log(`Indexed Paragraphs ${titles.length - (bulkOps.length / 2)} - ${titles.length}\n\n\n`)
}

updateData()