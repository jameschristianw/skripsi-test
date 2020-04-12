import React, { Component } from 'react';
import {
    HelloTransaction,
} from 'lisk-hello-transactions';
import { api } from '../api.js';
import * as cryptography from '@liskhq/lisk-cryptography';
import {utils} from "@liskhq/lisk-transactions";
import Select from 'react-select';
import FileBase64 from 'react-file-base64';

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
            photo: '',
            response: { meta: { status: false }},
            transaction: {},
            isSent: false
        };
    }

    opsiProdi = [
        {label: 'Informatika', value: 'Informatika'},
        {label: 'Sistem Informasi', value: 'Sistem Informasi'},
        {label: 'Teknik Komputer', value: 'Teknik Komputer'},
        {label: 'Teknik Elektro', value: 'Teknik Elektro'},
        {label: 'Teknik Fisika', value: 'Teknik Fisika'},
        {label: 'Manajemen', value: 'Manajemen'},
        {label: 'Akuntansi', value: 'Akuntansi'},
        {label: 'Komunikasi Strategis', value: 'Komunikasi Strategis'},
        {label: 'Jurnalistik', value: 'Jurnalistik'},
        {label: 'Design Komunikasi Visual', value: 'Design Komunikasi Visual'},
        {label: 'Film', value: 'Film'},
        {label: 'Animasi', value: 'Animasi'},
        {label: 'Perhotelan', value: 'Perhotelan'},
    ]

    opsiGelar = [
        {label: '', value: ''},
        {label: '', value: ''},
        {label: '', value: ''},
        {label: '', value: ''},
        {label: '', value: ''},        
    ]

    handleChange = (event) => {
        console.log(event)

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

    handleSelectChange = (event, meta) =>{
        console.log(event, meta);

        let nam = meta.name;
        let val = event.value;
        this.setState({[nam]: val});

	    console.log(this.state);
    }

    getFiles(files){
        this.setState({ photo: files[0].base64 })
      }

    componentDidMount(){
        this.setState({prodi: 'Informatika', gelar: 'S.Kom.'})
    }

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
            this.setState({isSent: true})
        }).catch(err => {
            console.log(JSON.stringify(err, null, 2));
        });
        // this.setState({isSent: true})
    }

    //<pre>Transaction: {JSON.stringify(this.state.transaction, null, 2)}</pre>

    render() {
        const isSentState = this.state.isSent;
        const thisState = this.state;

        function Response(props){
            const isSent = thisState.isSent;
            if(isSent){
                return (
                    <div className="response">
                        <p>Sertifikat berhasil dimasukkan! Mahasiswa dengan nama {thisState.nama} dapat mengakeses ijazah eletroniknya dengan memasukkan {thisState.transaction.id} pada halaman Cari Ijazah</p>
                        
                        {/* <p>Response: {JSON.stringify(thisState.response, null, 2)}</p>
                        <p>Transaction: {JSON.stringify(thisState.transaction, null, 2)}</p> */}
                    </div>  
                )
            } 
            return null;
        }
        
        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Input Ijazah</div>
                {/* <p>Masukkan Data Mahasiswa</p> */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Nama Mahasiswa: <span className="required">*</span></span>
                        <input type="text" id="nama" name="nama" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Nomor Induk Mahasiswa: <span className="required">*</span></span>
                        
                        <input type="number" id="nim" name="nim" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Program Studi: <span className="required">*</span></span>
                        {/* <Select
                            options={this.opsiProdi}
                            defaultValue={{label: 'Informatika', value: 'Informatika'}}
                            onChange={this.handleSelectChange}
                            name="prodi" id="prodi"
                        /> */}
                        {/* <input type="text" id="prodi" name="prodi" className="input-field" onChange={this.handleChange} /> */}
                        <select className="select-field" name="prodi" id="prodi" onChange={this.handleChange}>
                            <option value="-">-- Pilih Program Studi --</option>
                            <option value="Informatika">Informatika</option>
                            <option value="Sistem Informasi">Sistem Informasi</option>
                            <option value="Teknik Komputer">Teknik Komputer</option>
                            <option value="Teknik Elektro">Teknik Elektro</option>
                            <option value="Teknik Fisika">Teknik Fisika</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Komunikasi Strategis">Komunikasi Strategis</option>
                            <option value="Jurnalistik">Jurnalistik</option>
                            <option value="Design Komunikasi Visual">Design Komunikasi Visual</option>
                            <option value="Film">Film</option>
                            <option value="Animasi">Animasi</option>
                            <option value="Perhotelan">Perhotelan</option>
                        </select>
                    </label> <br/>
                    <label>
                        <span>Gelar: <span className="required">*</span></span>
                        
                        <select className="select-field" name="gelar" id="gelar" onChange={this.handleChange}>
                            <option value="-">-- Pilih Gelar --</option>
                            <option value="S.Kom.">Sarjana Komputer (S.Kom.)</option>
                            <option value="S.E.">Sarjana Ekonomi (S.E.)</option>
                            <option value="S.I.Kom.">Sarjana Ilmu Komunikasi (S.I.Kom.)</option>
                            <option value="S.Ds.">Sarjana Design (S.Ds.)</option>
                            <option value="A.Md.Par.">Ahli Madya Pariwisata (A.Md.Par.)</option>
                        </select>
                    </label> <br/>
                    <label>
                        <span>Nomor Ijazah UMN: <span className="required">*</span></span>
                        
                        <input type="text" id="niu" name="niu" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Penomoran Ijazah Nasional: <span className="required">*</span></span>
                        
                        <input type="text" id="pin" name="pin" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Email: <span className="required">*</span></span>
                        
                        <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Photo: <span className="required">*</span></span>
                        <FileBase64 multiple={ true } onDone={ this.getFiles.bind(this) } />
                        {/* <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} /> */}
                    </label> <br/>
                    <label>
                        <span>Passphrase: <span className="required">*</span></span>
                        
                        <input type="password" id="passphrase" className="input-field" name="passphrase" onChange={this.handleChange} />
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>

                <Response isSent={this.state}/>              
            </div>
        );
    }
}
export default Transfer;
