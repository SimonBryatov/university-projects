var jsonfile = require('jsonfile')
var file = './clientConfig.json'
module.exports = {
    getConfig()  {
    let config = jsonfile.readFileSync(file);
    return config
},
    setConfig(config) {
            jsonfile.writeFileSync("./clientConfig.json", config, {spaces: 2, EOL: '\r\n'})
    }
}