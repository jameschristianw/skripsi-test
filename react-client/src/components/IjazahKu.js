import React, { Component } from 'react';
import { api } from '../api.js';
import Cookies from "universal-cookie";
import { PDFViewer } from '@react-pdf/renderer';
import IjazahPage from './IjazahPage';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from '../images/logo-100.png';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFF6'
    },
    sectionLeftRight: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
  });
  

class IjazahKu extends Component{
    constructor(props){
        super(props)
        this.state = {
            idIjazah: this.props.idIjazah,
            data: ''
        }
    }

    async componentWillMount() {
        const cookies = new Cookies();
        
        console.log(this.state);
        api.transactions.get({ id: cookies.get('ijazahId') })
            .then(res => {
                this.setState({data: res.data[0].asset})
            })
    }

    componentWillUnmount() {
        this.setState({idIjazah: this.state.idIjazah});
    }

    async componentDidMount() {
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

    btnDownloadIjazah = () => {
        ReactPDF.render(<IjazahPage />, `${__dirname}/example.pdf`);
    }

    render() {
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

            var filename = data.nim + '.pdf';

            return(
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Ijazahku</div>

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

                    <PDFDownloadLink document={<IjazahPage data={this.state.data}/>} fileName={filename}> 
                        <button>Unduh sebagai PDF</button> 
                    </PDFDownloadLink>          
                </div>
            )
        } else {
            return null;
        }
    }
}

export default IjazahKu;