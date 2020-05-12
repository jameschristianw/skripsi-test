import React, { Component } from 'react';
import {
    TransaksiIjazah,
} from 'lisk-ijazah';
import { api } from '../api.js';
import * as cryptography from '@liskhq/lisk-cryptography';
import {utils} from "@liskhq/lisk-transactions";
import FileBase64 from 'react-file-base64';
import md5 from 'md5';

const networkIdentifier = cryptography.getNetworkIdentifier(
    "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
    "Lisk",
);

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nama: '',
            tempattl: '',
            ttl: '',
            nim: '',
            jenjang: '',
            fakultas: '',
	        prodi: '',
            gelar: '',
            niu: '',
            pin: '',
            tin: '',
            email: '',
            photo: '',
            tempattd: '',
            ttd: '',
            passphrase: '',
            status: 'Active',
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
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    };

    handleSelectChange = (event, meta) =>{
        let nam = meta.name;
        let val = event.value;
        this.setState({[nam]: val});
    }

    getFiles(files){
        this.setState({ photo: files[0].base64 })
      }

    componentDidMount(){
        this.setState({prodi: 'Informatika', gelar: 'S.Kom.'})
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const inputIjazah = new TransaksiIjazah({
            asset: {
                nama: this.state.nama,
                tempattl: this.state.tempattl,
                ttl: this.state.ttl,
                nim: this.state.nim,
                jenjang: this.state.jenjang,
                fakultas: this.state.fakultas,
                prodi: this.state.prodi,
                gelar: this.state.gelar,
                niu: this.state.niu,
                pin: this.state.pin,
                tin: this.state.tin,
                email: this.state.email,
                photo: this.state.photo,
                tempattd: this.state.tempattd,
                ttd: this.state.ttd,
                status: 'Active'
            },
            networkIdentifier: networkIdentifier,
            timestamp: utils.getTimeFromBlockchainEpoch(new Date()),
        });

        inputIjazah.sign(this.state.passphrase);
        api.transactions.broadcast(inputIjazah.toJSON()).then(response => {
            this.setState({response:response});
            this.setState({transaction:inputIjazah});
            this.setState({isSent: true})

            var ttl = this.state.ttl.replace('-', '').replace('-', '');

            var values = {
                name: this.state.nama,
                email: this.state.email,
                password: md5(ttl),
                ijazah: this.state.transaction.id,
                status: 1
            }

            fetch('/create-account', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            }).then(response => {
                console.log(response)
            })
        }).catch(err => {
        });
    }


    render() {
        // const isSentState = this.state.isSent;
        const thisState = this.state;

        function Response(props){
            const isSent = thisState.isSent;
            if(isSent){
                return (
                    <div className="response">
                        <p>Sertifikat berhasil dimasukkan! Mahasiswa dengan nama {thisState.nama} dapat mengakeses ijazah eletroniknya dengan memasukkan {thisState.transaction.id} pada halaman Cari Ijazah</p>
                    </div>  
                )
            } 
            return null;
        }
        
        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Input Ijazah</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Nama Mahasiswa: <span className="required">*</span></span>
                        <input type="text" id="nama" name="nama" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Tempat dan Tanggal Lahir: <span className="required">*</span></span>
                        <input type="tempattl" id="tempattl" name="tempattl" className="input-field-2" onChange={this.handleChange} /><input type="date" id="ttl" name="ttl" className="input-field-2" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Nomor Induk Mahasiswa: <span className="required">*</span></span>
                        
                        <input type="number" id="nim" name="nim" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Jenjang Pendidikan: <span className="required">*</span></span>
                        
                        <select className="select-field" name="jenjang" id="jenjang" onChange={this.handleChange}>
                            <option value="-">-- Pilih Fakultas --</option>
                            <option value="sarjanas1">Sarjana Strata 1</option>
                            <option value="diploma3">Diploma 3</option>
                        </select>
                    </label> <br/>
                    <label>
                        <span>Fakultas: <span className="required">*</span></span>
                        
                        <select className="select-field" name="fakultas" id="fakultas" onChange={this.handleChange}>
                            <option value="-">-- Pilih Fakultas --</option>
                            <option value="fti">Fakultas Teknik & Informatika</option>
                            <option value="fbisnis">Fakultas Bisnis</option>
                            <option value="filkom">Fakultas Ilmu Komunikasi</option>
                            <option value="fsds">Fakultas Seni & Design</option>
                            <option value="perhotelan">D3 Perhotelan</option>
                        </select>
                    </label> <br/>
                    <label>
                        <span>Program Studi: <span className="required">*</span></span>
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
                        <span>Tanggal Ijazah Nasional: <span className="required">*</span></span>
                        
                        <input type="date" id="tin" name="tin" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Email: <span className="required">*</span></span>
                        
                        <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    <label>
                        <span>Foto: <span className="required">*</span></span>
                        <FileBase64 multiple={ true } onDone={ this.getFiles.bind(this) } />
                    </label> <br/>
                    <label>
                        <span>Tempat dan Tanggal Diberikan: <span className="required">*</span></span>
                        <input type="text" id="tempattd" name="tempattd" className="input-field-2" onChange={this.handleChange} /><input type="date" id="ttd" name="ttd" className="input-field-2" onChange={this.handleChange} />
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
