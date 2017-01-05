module.exports = {
  retrieveTable : function(req, res) {
    console.log('getting GET request for', req.tableName);
    return res.send('GET recieved for ' + req.tableName);
  }
}