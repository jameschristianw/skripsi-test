import React, { Component } from 'react';
import { api } from '../api.js';
//import HelloTransaction from '../transactions/hello_transaction';
import {
    TransaksiIjazah,
} from 'lisk-hello-transactions';

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    async componentDidMount() {
        const transactions  = await api.transactions.get({ type: TransaksiIjazah.TYPE, limit: 100 });

        this.setState({ data: transactions });
    }

    render() {
        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Semua Ijazah</div>
                <ul><pre>{JSON.stringify(this.state.data, null, 2)}</pre></ul>
                {/* <h2>Cari Ijazah</h2> */}
                {/* <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Masukkan ID Ijazah: <span className="required">*</span></span>
                        <input type="number" id="idIjazah" name="idIjazah" className="input-field" onChange={this.handleChange} />
                    </label> <br/> */}

                    {/* <label>
                        Masukkan ID Ijazah:
                        <input type="text" id="idIjazah" name="idIjazah" onChange={this.handleChange}/>
                    </label> */}
                    {/* <input type="submit" value="Submit" />
                </form>
                
                <Response sumbitted={this.state}/> */}
            </div>
            // <div>
            //     <h2>All Hello Transactions</h2>
            //     <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            // </div>
        );
    }
}
export default HelloTransactions;
