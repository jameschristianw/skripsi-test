import React, { Component } from 'react';
import { api } from '../api.js';
import ResponSearch from './ResponSearch'
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
            data: [] ,
            values: [],
            done: false,
            error: false
        };
    }

    // async componentDidMount() {
    //     const transactions  = await api.transactions.get({ type: HelloTransaction.TYPE, limit: 100 });

    //     this.setState({ data: transactions });
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({sumbitted: true})
        // console.log(this.state.idIjazah);
        
        // api.transactions.get({ id: this.state.idIjazah }).then( response => { this.setState({data: response}); console.log(response) });
        if (this.state.idIjazah !== ""){
            api.transactions.get({ id: this.state.idIjazah })
                .then( response => { 
                    
                    // console.log(response) 
                    
                    if(response.meta.count === 0){
                        this.setState({values: false})
                    } else {
                        this.setState({values: response.data[0].asset}); 
                    }

                    // console.log(response) 

                    var datas = response.data;
                    // console.log(datas);
                    var temp = ''

                    if(response.meta.count > 0){
                        temp = datas.map(val => {
                            // console.log(val)
        
                            var t = {
                                nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                                nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',
                                pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                                id: val.id !== undefined ? val.id : 'Nan',
                                niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                                status: val.asset.status !== undefined ? val.asset.status : 'Not Active',
                                photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                                source: 'CariIjazah'
                            }
        
                            return t;
                        })   
                        
                        this.setState({data: {
                            values: temp,
                            source: 'CariIjazah',
                        }, done: true, available: true})

                        // console.log(this.state.values);
                    }

                })
        } else {
            // console.log("Kosong")
        }
    }

    componentWillUnmount() {
        this.setState({done: false});
    }

    handleChange = (event) => {
        event.preventDefault();

        let id = event.target.value;

        this.setState({idIjazah: id});
        // console.log(this.state);
    }

    resetState(){
        this.setState({sumbitted: false});
        this.state({available:false})
    }

    render() {
        const thisState = this.state;

        if (this.state.idIjazah === undefined){
            // console.log('Data ijazah tidak ditemukan!');
            // this.setState({sumbitted: false});
            return (
                <div className="response">Input tidak boleh kosong!</div>
            )
        } else if (this.state.submitted) { //klo di submit
            if (this.state.available){ //klo ketemu 
                // console.log(this.state.values);
                
                return (
                    <div></div>
                )
            } else { //klo ngga ketemu
                if (!this.state.error) {
                    // console.log('Data ijazah tidak ditemukan!');
                    // this.setState({sumbitted: false});
                    return (
                        <div className="response">Data ijazah tidak ditemukan!</div>
                    )
                } else {
                    // console.log('Data ijazah tidak ditemukan!');
                    // this.setState({sumbitted: false});
                    return (
                        <div className="response">Data ijazah tidak ditemukan!</div>
                    )
                }
            }
        } else {

        }

        function Response(props){
            // <pre>{JSON.stringify(this.state.data, null, 2)}</pre>

            if (thisState.sumbitted){
                const isAvailable = thisState.available;

                if(thisState.data.length === 0){
                    
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
                
                <ResponSearch submitted={this.state.values}/>
            </div>
        );
    }
}
export default HelloTransactions;
