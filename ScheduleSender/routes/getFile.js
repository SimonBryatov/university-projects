var jsonfile = require('jsonfile')
var file = './clients.json'
const updateSchedule = require("../handlers/updateSchedule")
module.exports = (req, res) => {
    let query = req.query;
    console.log('Got Request from ' , req.ip);
    let ledger = jsonfile.readFileSync(file);
    let clientEntry = ledger[query.id]
    if (clientEntry) {
      if (clientEntry.clientKey === query.clientKey) {
      console.log("Authorized client with id: " + query.id);
      let encryptedResponse = updateSchedule("123");
      res.send(encryptedResponse);
      } else {
        res.status(401)
        res.send("Error! Not Authorized");
      };
    }

    // await send(ctx, './file.txt');
  };