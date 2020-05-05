import React, { Component } from 'react'
import DataTable from 'react-data-table-component'

class Response extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.submitted
        }

        this.handleClick.bind(this)
    }

    handleClick = (event) => {
        alert(event.target.value)
    }

    setColumns(){
        const columns = [
            {
                name: <label style={{fontSize: '20px'}}>Name</label>,
                sortable: true,
                selector: 'nama',
                cell: row => <label style={{fontSize: '20px'}}>{row.nama}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>NIM</label>,
                sortable: true,
                selector: 'nim',
                cell: row => <label style={{fontSize: '20px'}}>{row.nim}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah UMN</label>,
                sortable: true,
                selector: 'niu',
                cell: row => <label style={{fontSize: '20px'}}>{row.niu}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah Nasional</label>,
                sortable: true,
                selector: 'pin',
                cell: row => <label style={{fontSize: '20px'}}>{row.pin}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Status</label>,
                sortable: true,
                selector: 'status',
                cell: row => <label style={{fontSize: '20px'}}>{row.status}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Action</label>,
                sortable: true,
                selector: 'id',
                cell: row => <div><button id={row.id} value={row.id} onClick={this.handleClick}>Alert Me</button></div>
            },
        ]
        
        return columns;
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
        var data = this.props.submitted;

        if (data.length !== 0 && data !== false){
            var data = this.props.submitted;
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
                <div >
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
                </div>
            )
        } else if (data === false){
            return (
                <div className="content">
                    <span style={{color: 'red'}}> Error!</span> Ijazah tidak ditemukan. Masukkan ID ijazah dengan benar!
                </div>
            )
        }
        else {
            return null;
        }
        
    }
}

export default Response;