const pg = require('pg');

module.exports = {
  addRecord: function(req, res) {
    const url = req.body.url;
    let keys = '';
    let values = '';
    let len = Object.keys(req.body.data).length;

    Object.keys(req.body.data).forEach(function(key, i) {
      if (i === len - 1) {
        keys += `${key.toString()}`;
      } else {
        keys += `${key.toString()}, `;
      }
    });

    Object.keys(req.body.data).forEach(function(key, i) {

      if(!parseInt(req.body.data[key])) {
        req.body.data[key] = `\'${req.body.data[key]}'`;
      }
      if (i === len - 1) {
        values += `${req.body.data[key]}`;
      } else {
        values += `${req.body.data[key]}, `;
      }
    });

    console.log(keys);
    console.log(values);


    console.log('keys', keys);
    console.log('url', url);
    console.log('values', values);

    pg.connect(url, (err, db) => {
      if (err) console.log(err);
      console.log('SUCCESS!');
      console.log(`INSERT INTO ${req.body.tableName} (${keys}) VALUES (${values});`);
      db.query(`INSERT INTO ${req.body.tableName} (${keys}) VALUES (${values});`, (err, results, fields) => {
        if(err) console.log(err);
        console.log(results);
      });
    });
  },
};