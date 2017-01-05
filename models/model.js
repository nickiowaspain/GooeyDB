const retrieveTable = require('./retrieveTable_module');
const add_record = require('./add_record');

module.exports = {
  // retrieve : retrieve.retrieve,
  retrieveTables: retrieveTable.retrieveTables,
  retrieveTable: retrieveTable.retrieveTable,
  addRecord: add_record.addRecord,
  // dbConnect: dbConnect.dbConnect
};
