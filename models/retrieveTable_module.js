const pg = require('pg');

module.exports = {
  retrieveTables: function(req, res) {
    // get the database url  and table name from the request body 
    const url = req.body.url;
    const dbName = req.body.dbName
    console.log(url);
    console.log(dbName);
    // connect to the above provided url
    pg.connect(url, (err, db) => {
      if (err) throw new Error('could not access database');
      // make a query for all tables in the specified database
      db.query(`SELECT table_schema || '.' || table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');`, (err, results, fields) => {
        if (err) throw new Error('could not find tables');
        const tables = results.rows;
        const output = [];
        // filter out supplementary tables and only get user created table names
        for (let i = 0; i < tables.length; i += 1) {
          output.push(tables[i]['?column?']);
        }
        console.log(output);
        // send an array of objects of each table name in response
        return res.send(JSON.stringify(output));
      });
    });
  },

  retrieveTable: function(req, res) {
    // get the database url  and table name from the request body 
    const url = req.body.url;
    let tableName = req.body.tableName;
    const upperCaseFlag = function (tableName) {
      for (let i = 0; i < tableName.length; i += 1) {
        if (tableName[i] == tableName[i].toUpperCase()) {
          return true;
        }
      }
    }
    if (upperCaseFlag) {
      tableName = `"${tableName}"`;
    }
    // connect to the above provided url
    pg.connect(url, (err, db) => {
      if (err) throw new Error('could not access table');
      // make a query for all records for the given table anme
      db.query(`SELECT * FROM ${tableName}`, (err, results, fields) => {
        if (err) throw new Error('could not find table');
        const output = results.rows;
        // send an array of objects of each record in response
        return res.send(JSON.stringify(output));
      });
    });
  }
};