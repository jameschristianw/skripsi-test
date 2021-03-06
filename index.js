const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); 
const TransaksiIjazah = require('./transactions/transaksi_ijazah');

configDevnet.app.label = 'ijazah-blockchain-app'; 
//configDevnet.components.storage.user = '<username>'; 
//configDevnet.components.storage.password = 'password'; 

configDevnet.components.storage.port = 5433;
configDevnet.components.storage.database = "lisk_dev_test";
configDevnet.modules.http_api.address = "192.168.1.18"
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet); 
app.registerTransaction(TransaksiIjazah); 

app 
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });



