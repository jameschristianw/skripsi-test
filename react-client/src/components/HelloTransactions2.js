import React, { Component } from 'react';
import { api } from '../api.js';
//import HelloTransaction from '../transactions/hello_transaction';
// import {
//     HelloTransaction,
// } from 'lisk-hello-transactions';

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            available: false,
            sumbitted: false,
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
        this.setState({sumbitted: true})
        console.log(event.target.name);
        console.log(event.target.value);
        api.transactions.get({ id: this.state.idIjazah }).then( response => { this.setState({data: response}); console.log(response) });
        if (event.target.value !== undefined){
            api.transactions.get({ id: this.state.idIjazah }).then( response => { this.setState({data: response}); console.log(response) });
        }
    }

    handleChange = (event) => {
        event.preventDefault();

        let id = event.target.value;

        this.setState({idIjazah: id});
        console.log(this.state);
    }

    resetState(){
        this.setState({sumbitted: false});
        this.state({available:false})
    }

    render() {
        const thisState = this.state;

        function Response(props){
            // <pre>{JSON.stringify(this.state.data, null, 2)}</pre>

            if (thisState.sumbitted){
                const isAvailable = thisState.available;

                if(thisState.data.length === 0){
                    console.log('Data ijazah tidak ditemukan!');
                    // this.setState({sumbitted: false});
                    return (
                        <div className="response">Data ijazah tidak ditemukan!</div>
                    )
                } else {
                    // this.setState({sumbitted: false});
                    return (
                        <div className="response">
                            {JSON.stringify(thisState.data, null, 2)}
                        </div>  
                    )
                }
            }
            return null;
        }

        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Cari Ijazah</div>
                {/* <h2>Cari Ijazah</h2> */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Masukkan ID Ijazah: <span className="required">*</span></span>
                        <input type="number" id="idIjazah" name="idIjazah" className="input-field" onChange={this.handleChange} />
                    </label> <br/>

                    {/* <label>
                        Masukkan ID Ijazah:
                        <input type="text" id="idIjazah" name="idIjazah" onChange={this.handleChange}/>
                    </label> */}
                    <input type="submit" value="Submit" />
                </form>
                
                <Response sumbitted={this.state}/>
            </div>
        );
    }
}
export default HelloTransactions;
