const fs = require('fs');
const csv = require('csv-parser');

const IMPORT_FILENAME = './seed.json';
const CSV_FILENAME = './raw-ndb.csv'
const LENGTH = 310;
const imported = [];
const data = [];

fs.createReadStream(CSV_FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    imported.push(row);
  })
  .on('end', () => {
    console.log(`CSV file successfully imported. Total records: ${imported.length}`);
    
    fs.writeFile(IMPORT_FILENAME, JSON.stringify(imported, null, 2), (err, result) => {
      if(err) {
        return console.log('Error: ', err);
      }
      console.log('JSON file successfully created.');
    });
  });

