// Indexes datbase

const fs = require('fs')
const path = require('path')
const csvReader = require('fast-csv')
const esConnection = require('../config/connection')
const { text } = require('express')

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
    // Clear previous ES index
    await esConnection.resetIndex()

    // Read  directory
    let files = fs.readdirSync('../dataset').filter(file => file.slice(-4) === '.csv')
    console.log(`Found ${files.length} Files`)

    // Read each book file, and index each paragraph in elasticsearch
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
  for(let i=0; i < texts.length; i++) {
    esConnection.client.index({
      index: esConnection.index,
      type: esConnection.type,
      body: {
        'title': titles[i],
        'text': texts[i],
      }
    }, function(err, res, status) {
      if(i%500 === 0) console.log(status)
    }) 
  }
}

updateData()