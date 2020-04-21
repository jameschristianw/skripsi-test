import React, { Component } from 'react';
import { api } from '../api.js';
//import HelloTransaction from '../transactions/hello_transaction';
import {
    TransaksiIjazah,
} from 'lisk-hello-transactions';
import ResponseSearch from './ResponSearch'

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    async componentDidMount() {
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
                    source: 'SemuaIjazah'
                }})
            })
    }

    render() {
        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Semua Ijazah</div>
                {/* <ul><pre>{JSON.stringify(this.state.data, null, 2)}</pre></ul> */}
                {/* <h2>Cari Ijazah</h2> */}
                
                <ResponseSearch submitted={this.state.data}/>
            </div>
            // <div>
            //     <h2>All Hello Transactions</h2>
            //     <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            // </div>
        );
    }
}
export default HelloTransactions;
