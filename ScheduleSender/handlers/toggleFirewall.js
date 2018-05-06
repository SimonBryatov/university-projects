module.exports = 
 toggleNetwork = (networkOnline) => {
    if (networkOnline) {
        //let startTime = Date.now();
        console.log("Going Offline...");
        var child1 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_BLOCK_ALL_INPUT" new enable=yes`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                
                console.log("All network adapters are Offline...");
                networkOnline = false;
                // console.log((Date.now() - startTime))
            }
            // Validate stdout / stderr to see if service is already running
            // perhaps.
            //ipconfig/release
            //ipconfig/renew
        });
        var child2 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_BLOCK_ALL_OUTPUT" new enable=yes`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                
                console.log("All network adapters are Offline...");
                networkOnline = false;
            }
            // Validate stdout / stderr to see if service is already running
            // perhaps.
            //ipconfig/release
            //ipconfig/renew
        });
    } else {
        var child1 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_BLOCK_ALL_INPUT" new enable=no`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                
                console.log("All network adapters are Offline...");
                networkOnline = true;
            }
            // Validate stdout / stderr to see if service is already running
            // perhaps.
            //ipconfig/release
            //ipconfig/renew
        });
        var child2 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_BLOCK_ALL_OUTPUT" new enable=no`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(stdout);
                
                console.log("All network adapters are Offline...");
                networkOnline = true;
            }
            // Validate stdout / stderr to see if service is already running
            // perhaps.
            //ipconfig/release
            //ipconfig/renew
        });

    }

}