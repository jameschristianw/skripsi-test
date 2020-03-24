import React, { Component } from 'react';
import { api } from '../api.js';
//import HelloTransaction from '../transactions/hello_transaction';
import {
    HelloTransaction,
} from 'lisk-hello-transactions';

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            idIjazah: '',
            data: [] 
        };
    }

    // async componentDidMount() {
    //     const transactions  = await api.transactions.get({ type: HelloTransaction.TYPE, limit: 100 });

    //     this.setState({ data: transactions });
    // }

    handleSubmit = (event) => {
	event.preventDefault();

        api.transactions.get({ id: this.state.idIjazah }).then( response => { this.setState({data: response}) });
    }

    handleChange = (event) => {
        let id = event.target.value;

        this.setState({idIjazah: id});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h2>Cari Ijazah</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Masukkan ID Ijazah:
                        <input type="text" id="idIjazah" name="idIjazah" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
            </div>
        );
    }
}
export default HelloTransactions;
