const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); 
const HelloTransaction = require('./transactions/hello_transaction');

configDevnet.app.label = 'test-blockchain-app'; 
//configDevnet.components.storage.user = '<username>'; 
//configDevnet.components.storage.password = 'password'; 

configDevnet.components.storage.port = 5433;
configDevnet.components.storage.database = "lisk_dev_test";
// configDevnet.modules.chain.forging.force = false;
configDevnet.modules.http_api.address = "192.168.0.7"
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet); 
app.registerTransaction(HelloTransaction); 

app 
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
