import React, { Component } from 'react';
import { api } from '../api.js';
//import HelloTransaction from '../transactions/hello_transaction';
import {
    TransaksiIjazah,
} from 'lisk-hello-transactions';
import DataTable from 'react-data-table-component'
import ResponseSearch from './ResponSearch'

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [], done: false };
    }

    componentWillUnmount() {
        console.log('SemuaIjazah: on componentWillUnmount');
        
        this.setState({done: false})
    }

    async componentDidMount() {
        console.log('SemuaIjazah: on componentDidMount');

        await api.transactions.get({ type: TransaksiIjazah.TYPE, limit: 100, sort:'timestamp:desc' })
            .then(response => {
                this.setState({ data: response });

                var datas = response.data;
                // console.log(datas);

                var temp = []

                temp = datas.map(val => {
                    // console.log(val)

                    var t = {
                        nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                        nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',
                        pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                        id: val.id !== undefined ? val.id : 'Nan',
                        niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                        status: val.asset.status !== undefined ? val.asset.status : 'Not Active',
                        photos: ''
                    }

                    return t;
                })

                this.setState({data: {
                    values: temp,
                    source: 'SemuaIjazah',
                }, done: true})

                console.log('SemuaIjazah: on the end of then');
            })
        console.log('SemuaIjazah: on the end of componentDidMount');
        
        console.log(this.state)
        this.forceUpdate();
        console.log(this.state)
    }

    handleClick(event) {
        alert(event.target.value);
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

    render() {
        console.log('SemuaIjazah: on render');;
        
        console.log('SemuaIjazah: ', this.state.done);
        console.log('SemuaIjazah: ', this.state.values);

        if(!this.state.done) {
            return (
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Semua Ijazah</div>
                    {/* <ul><pre>{JSON.stringify(this.state.data, null, 2)}</pre></ul> */}
                    {/* <h2>Cari Ijazah</h2> */}
                    
                    {/* <ResponseSearch submitted={this.state.data}/> */}
                    
                </div>
                // <div>
                //     <h2>All Hello Transactions</h2>
                //     <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                // </div>
            );
        } else {
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

// return(
//     <DataTable
//         columns={this.setColumns()}
//         data={datas.values}
//         noHeader
//     />
// )