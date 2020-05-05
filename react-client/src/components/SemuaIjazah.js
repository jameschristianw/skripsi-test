import React, { Component } from 'react';
import { api } from '../api.js';
import {
    TransaksiIjazah,
} from 'lisk-hello-transactions';
import DataTable from 'react-data-table-component'
import { Page } from '@react-pdf/renderer';

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [], done: false, };
    }

    componentWillUnmount() {
        this.setState({done: false})
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

    async componentDidMount() {
        fetch('/get-cert').then(res => {
            // console.log(res.json());
            return res.json();
        }).then(async (result) => {
            console.log(result);

            var temp = [];

            console.log(result.length);
            var counter = 0;

            await result.forEach(async (element) => {
                // console.log(element)
                
                await api.transactions.get({ id: element.id_ijazah })
                .then( response => { 
                    // if(response.meta.count === 0){
                    //     this.setState({values: false})
                    // } else {
                    //     this.setState({values: response.data[0].asset}); 
                    // }

                    console.log(response);

                    var val = response.data[0];
                    
                    console.log(temp)

                    if(response.meta.count > 0){
                        console.log(val)

                        var tmp = {
                            nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                            nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',        
                            prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
                            fakultas: val.asset.fakultas !== undefined ? this.getFakultasName(val.asset.fakultas) : 'Nan',
                            pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                            id: val.id !== undefined ? val.id : 'Nan',
                            niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                            status: element.status === 1 ? 'Active' : 'Not Active',
                            photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                        }

                        temp.push(tmp);
                    }
                }).then( () => {
                    console.log(this.state.data)
                })

                counter++;
                if(counter == result.length){
                    // console.log('yeay done');
                    // console.log(temp);
                    this.setState({data: {
                        values: temp,
                        source: 'SemuaIjazah',
                    }, done: true})
                }
            })
        })

    //     await api.transactions.get({ type: TransaksiIjazah.TYPE, limit: 100, sort:'timestamp:desc' })
    //         .then(response => {
    //             this.setState({ data: response });

    //             var datas = response.data;
    //             var temp = []

    //             console.log(datas)

    //             temp = datas.map(val => {

    //                 fetch('/get-cert-status', {
    //                     method: 'post',
    //                     body: JSON.stringify({
    //                         id: val.asset.id
    //                     })
    //                 }).then(response => {
    //                     console.log(response);
                        
    //                 })

    //                 var t = {
    //                     nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
    //                     nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',
    //                     prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
    //                     fakultas: val.asset.fakultas !== undefined ? this.getFakultasName(val.asset.fakultas) : 'Nan',
    //                     pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
    //                     id: val.id !== undefined ? val.id : 'Nan',
    //                     niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
    //                     status: val.asset.status !== undefined ? val.asset.status : 'Not Active',
    //                     photos: ''
    //                 }

    //                 return t;
    //             })

    //             this.setState({data: {
    //                 values: temp,
    //                 source: 'SemuaIjazah',
    //             }, done: true})
    //         })
    //     // this.forceUpdate();
    }

    handleClick(event) {
        alert(event.target.value);

        var values = {
            id: event.target.value
        }

        fetch('/cert-action', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }). then(response => {
            console.log(response)
        })

        window.location.reload();
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
                name: <label style={{fontSize: '20px'}}>Program Studi</label>,
                sortable: true,
                selector: 'prodi',
                cell: row => <label style={{fontSize: '20px'}}>{row.prodi}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Fakultas</label>,
                sortable: true,
                selector: 'fakultas',
                cell: row => <label style={{fontSize: '20px'}}>{row.fakultas}</label>
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
                cell: row => {
                    if (row.status === 'Active'){
                        return (<div><button id={row.id} value={row.id} onClick={this.handleClick}>Disable</button></div>);
                    } else {
                        return (<div><button id={row.id} value={row.id} onClick={this.handleClick}>Enable</button></div>);
                    }
                }
            },
        ]
        
        return columns;
    }

    render() {
        console.log(this.state);
        

        if(!this.state.done) {
            return (
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Semua Ijazah</div>                    
                </div>
            );
        } else {
            console.log(this.state);

            return(
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Semua Ijazah</div>
                    
                    <DataTable
                        columns={this.setColumns()}
                        data={this.state.data.values}
                        noHeader
                    />
                </div>
            )
        }

        
    }
}
export default HelloTransactions;
