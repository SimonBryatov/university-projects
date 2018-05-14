module.exports = 
 toggleNetwork = (networkOnline) => {
    if (networkOnline) {
        let startTime = Date.now();
        console.log("Going Offline...");
        var child = require('child_process').exec('wmic path win32_networkadapter where PhysicalAdapter=True call disable', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                console.log("All network adapters are Offline...");
                networkOnline = false;
                console.log((Date.now() - startTime))
            }
        });
    } else {
        let startTime = Date.now();
        console.log("Going Online...");
        var child = require('child_process').exec('wmic path win32_networkadapter where PhysicalAdapter=True call enable', function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                console.log("All network adapters are Online");
                networkOnline = true;
                console.log((Date.now() - startTime))
            }
        });

    }

}