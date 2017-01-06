const retrieveTable = require('./retrieveTable_module');
const addRecord = require('./addRecord');

module.exports = {
  // retrieve : retrieve.retrieve,
  retrieveTables: retrieveTable.retrieveTables,
  retrieveTable: retrieveTable.retrieveTable,
  addRecord: addRecord.addRecord,
  // dbConnect: dbConnect.dbConnect
}