module.exports = 
 toggleNetwork = (networkOnline) => {
    if (!networkOnline) {
        //let startTime = Date.now();
        console.log("Going Offline...");
        var child1 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_INPUT_ACCEPT" new enable=no`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log(chalk.yellow("Network: INPUTS are DROPPED"));
                // networkOnline = false;
                // console.log((Date.now() - startTime))
            }
            //ipconfig/release
            //ipconfig/renew
        });
        var child2 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_OUTPUT_ACCEPT" new enable=no`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                // console.log(stdout);
                console.log(chalk.yellow("Network: OUTPUTS are DROPPED"));
                // networkOnline = false;
            }
            //ipconfig/release
            //ipconfig/renew
        });
    } else {
        console.log("Going Online...");
        var child1 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_INPUT_ACCEPT" new enable=yes`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                // console.log(stdout);
                console.log(chalk.yellow("Network: INPUTS are ACCEPTED"));
                // networkOnline = true;
            }
            //ipconfig/release
            //ipconfig/renew
        });
        var child2 = require('child_process').exec(`netsh advfirewall firewall set rule name="SS_OUTPUT_ACCEPT" new enable=yes`, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                // console.log(stdout);
                console.log(chalk.yellow("Network: OUTPUTS are ACCEPTED"));
                // networkOnline = true;
            }
            //ipconfig/release
            //ipconfig/renew
        });

    }

}