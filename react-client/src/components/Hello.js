import React, { Component } from 'react';
import {
    HelloTransaction,
} from 'lisk-hello-transactions';
import { api } from '../api.js';
import * as cryptography from '@liskhq/lisk-cryptography';
import {utils} from "@liskhq/lisk-transactions";

const networkIdentifier = cryptography.getNetworkIdentifier(
    "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
    "Lisk",
);

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nama: '',
	    nim: '',
	    prodi: '',
            gelar: '',
            niu: '',
            pin: '',
            email: '',
            passphrase: '',
            response: { meta: { status: false }},
            transaction: {},
        };
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

	console.log(this.state);
        // let helloText = event.target.hello;
        // let pass = event.target.passphrase;

        // this.setState({
        //     hello: helloText,
        //     passphrase: pass
        // })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const helloTransaction = new HelloTransaction({
            asset: {
                hello: this.state.hello,
		nama: this.state.nama,
	    	nim: this.state.nim,
		prodi: this.state.prodi,
	    	gelar: this.state.gelar,
	   	niu: this.state.niu,
	    	pin: this.state.pin,
	    	email: this.state.email,
            },
            networkIdentifier: networkIdentifier,
            timestamp: utils.getTimeFromBlockchainEpoch(new Date()),
        });

        helloTransaction.sign(this.state.passphrase);
        api.transactions.broadcast(helloTransaction.toJSON()).then(response => {
            this.setState({response:response});
            this.setState({transaction:helloTransaction});
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2));
        });
    }

    //<pre>Transaction: {JSON.stringify(this.state.transaction, null, 2)}</pre>

    render() {
        return (
            <div>
                <h2>Input Ijazah</h2>
                <p>Masukkan Data Mahasiswa</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nama Mahasiswa:
                        <input type="text" id="nama" name="nama" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Nomor Induk Mahasiswa:
                        <input type="text" id="nim" name="nim" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Program Studi:
                        <input type="text" id="prodi" name="prodi" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Gelar:
                        <input type="text" id="gelar" name="gelar" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Nomor Ijazah UMN:
                        <input type="text" id="niu" name="niu" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Penomoran Ijazah Nasional:
                        <input type="text" id="pin" name="pin" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Email:
                        <input type="text" id="email" name="email" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        Passphrase:
                        <input type="text" id="passphrase" name="passphrase" onChange={this.handleChange} />
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>

                <div>
                    
                    <p>Response: {JSON.stringify(this.state.response, null, 2)}</p>
                </div>
                }
            </div>
        );
    }
}
export default Transfer;
