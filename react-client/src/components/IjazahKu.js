import React, { Component } from 'react';
import { api } from '../api.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class IjazahKu extends Component{
    constructor(props){
        super(props)
        this.state = {
            idIjazah: this.props.idIjazah,
            // idIjazah: '11071575473338022951',
            data: ''
        }
    }

    async componentWillMount() {
        console.log(this.state);
        api.transactions.get({ id: this.state.idIjazah })
            .then(res => {
                console.log(res.data[0].asset);
                this.setState({data: res.data[0].asset})
            })
    }

    async componentDidMount() {
        // api.transactions.get({ id: this.state.idIjazah })
        console.log(this.state)
    }

    getMonthName = (monthNumber) => {
        let monthName = ''
        if(monthNumber === '01') monthName = "Januari"
        else if(monthNumber === '02') monthName = "Februari"
        else if(monthNumber === '03') monthName = "Maret"
        else if(monthNumber === '04') monthName = "April"
        else if(monthNumber === '05') monthName = "Mei"
        else if(monthNumber === '06') monthName = "Juni"
        else if(monthNumber === '07') monthName = "Juli"
        else if(monthNumber === '08') monthName = "Agustus"
        else if(monthNumber === '09') monthName = "September"
        else if(monthNumber === '10') monthName = "Oktober"
        else if(monthNumber === '11') monthName = "November"
        else if(monthNumber === '12') monthName = "Desember"
        return monthName;
    }

    getJenjangName = (jenjang) => {
        let jenjangName = '';

        if(jenjang === 'sarjanas1') jenjangName = "Sarjana Strata 1"
        else if (jenjang === 'diplomad3') jenjangName = "Diploma 3"

        return jenjangName
    }

    getFakultasName = (fakultas) => {
        let fakultasName = '';

        if (fakultas === 'fti') fakultasName = "Fakultas Teknik & Informatika"
        else if (fakultas === 'fbisnis') fakultasName = "Fakultas Bisnis"
        else if (fakultas === 'filkom') fakultasName = "Fakultas Ilmu Komunikasi"
        else if (fakultas === 'fsds') fakultasName = "Fakultas Seni & Design"
        else if (fakultas === 'perhotelan') fakultasName = "D3 Perhotelan"

        return fakultasName;
    }

    getGelarName = (gelar) => {
        let gelarName = '';

        if (gelar === 'S.Kom.') gelarName = "Sarjana Komputer"
        else if (gelar === 'S.E.') gelarName = "Sarjana Ekonomi"
        else if (gelar === 'S.I.Kom.') gelarName = "Sarjana Ilmu Komunikasi"
        else if (gelar === 'S.Ds.') gelarName = "Sarjana Design"
        else if (gelar === 'A.Md.Par.') gelarName = "Ahli Madya Parawisata"

        return gelarName;
    }

    render() {
        console.log(this.state.data)

        if (this.state.data !== ''){
            var data = this.state.data;
            var tempTtl = data.ttl.split("-");
            var tempTtd = data.ttd.split("-");
            var tempTin = data.tin.split("-")
            
            var monthTtl = this.getMonthName(tempTtl[1]);
            var monthTtd = this.getMonthName(tempTtd[1]);
            var monthTin = this.getMonthName(tempTin[1]);
            var ttl = tempTtl[2] + " " + monthTtl + " " + tempTtl[0];
            var ttd = tempTtd[2] + " " + monthTtd + " " + tempTtd[0];
            var tin = tempTin[2] + " " + monthTin + " " + tempTin[0];
            var jenjang = this.getJenjangName(data.jenjang);
            var gelar = this.getGelarName(data.gelar);
            var fakultas = this.getFakultasName(data.fakultas);

            return(
                <div className="content form-style-2">
                    <div className="form-style-2-heading">IjazahKu</div>
    
                    <table cellPadding="10">
                        <tbody>
                            <tr>
                                <td rowSpan="11">
                                    <img src={data.photo}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Nama Mahasiswa</td>
                                <td>: {data.nama}</td>
                            </tr>
                            <tr>
                                <td>Tempat dan Tanggal Lahir</td>
                                <td>: {data.tempattl}, {ttl}</td>
                            </tr>
                            <tr>
                                <td>Nomor Induk Mahasiswa</td>
                                <td>: {data.nim}</td>
                            </tr>
                            <tr>
                                <td>Jenjang Pendidikan</td>
                                <td>: {jenjang} / {gelar} ({data.gelar})</td>
                            </tr>
                            <tr>
                                <td>Fakultas</td>
                                <td>: {fakultas}</td>
                            </tr>
                            <tr>
                                <td>Program Studi</td>
                                <td>: {data.prodi}</td>
                            </tr>
                            <tr>
                                <td>Nomor Ijazah UMN</td>
                                <td>: {data.niu}</td>
                            </tr>
                            <tr>
                                <td>Penomoran Ijazah Nasional</td>
                                <td>: {data.pin}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Ijazah Nasional</td>
                                <td>: {tin}</td>
                            </tr>
                            <tr>
                                <td>Tempat dan Tanggal Diberikan</td>
                                <td>: {data.tempattd}, {ttd}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* <div>
                        <div className="row">
                            <img src={data.photo} className="columnGambar"/>
                            <div className="column">
                                <label>
                                    <span>Nama Mahasiswa</span>: {data.nama}
                                </label> 
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Tempat dan Tanggal Lahir</span>
                                    <span>: {data.tempattl}, {ttl}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Nomor Induk Mahasiswa</span>
                                    <span>: {data.nim}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Jenjang Pendidikan</span>: {jenjang} / {gelar} ({data.gelar})
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Fakultas</span>: {fakultas}
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Program Studi</span>
                                    <span>: {data.prodi}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Nomor Ijazah UMN</span>
                                    <span>: {data.niu}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Penomoran Ijazah Nasional</span>: {data.pin}
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Tanggal Ijazah Nasional</span>
                                    <span>: {tin}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="columnGambar"></div>
                            <div className="column">
                                <label>
                                    <span>Tempat dan Tanggal Diberikan</span> 
                                    <span>: {data.tempattd}, {ttd}</span>
                                </label>
                            </div>
                        </div> */}
                        
                        {/* <label>
                            <span>Photo: a</span>
                            <FileBase64 multiple={ true } onDone={ this.getFiles.bind(this) } />
                            <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} />
                        </label> <br/><br/> */}
                        
                    {/* </div> */}
                    
                </div>
            )
        } else {
            return null;
        }
    }
}

export default IjazahKu;