const pg = require('pg');

module.exports = {
  retrieveTable : function(req, res) {
    // get the database url  and table name from the request body 
    const url = req.body.url;
    const tableName = req.body.tableName;
    // connect to the above provided url
    pg.connect(url, (err, db) => {
      if (err) console.log(err);
      // make a query for all records for the given table anme
      db.query(`SELECT * FROM ${tableName}`, (err, results, fields) => {
        const output = results.rows;
        // send an array of objects of each record in response
        return res.send(JSON.stringify(output));
      });
    });
  }
}