const fs = require('fs');
const csv = require('csv-parser');

const IMPORT_FILENAME = './seed.json';
const CSV_FILENAME = './raw-ndb.csv'
const imported = [];
const COLUMNS = [
  'ndb_no',
  'description',
  'kcal',
  'protein_g',
  'carbohydrate_g',
  'fa_sat_g',
  'fa_mono_g',
  'fa_poly_g',
];

fs.createReadStream(CSV_FILENAME)
  .pipe(csv())
  .on('data', (row) => {
    const rowObj = {};

    COLUMNS.forEach((c) => {
      // combine fat columns
      if (c.match(/^fa_/)) {
        rowObj.fat_g = rowObj.fat_g || 0.0;
        rowObj.fat_g = (parseFloat(rowObj.fat_g, 10) + parseFloat(row[c], 10)).toFixed(2);
      } else {
        rowObj[c] = row[c];
      }
    });

    imported.push(rowObj);
  })
  .on('end', () => {
    console.log(`CSV file successfully imported. Total records: ${imported.length}`);
    console.log(`This is how the imported data look like: ${JSON.stringify(imported[0], null, 2)}`)
    
    fs.writeFile(IMPORT_FILENAME, JSON.stringify(imported, null, 2), (err, result) => {
      if(err) {
        return console.log('Error: ', err);
      }
      console.log('JSON file successfully created.');
    });
  });

