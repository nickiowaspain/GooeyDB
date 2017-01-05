const pg = require('pg');

module.exports = {
  addRecord: function(req, res) {
    const url = req.body.url;
    const tableName = req.body.tableName;
    const data = req.body.data;

    pg.connect(url, (err, db) => {
      if (err) console.log(err);
      db.query(`INSERT INTO ${tableName} (${keys}) VALUES (${values})`, (err, results, fields) => {
        // UPDATE VIEW
      });
    });
  },
};