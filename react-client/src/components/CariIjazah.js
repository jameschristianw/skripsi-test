import React, { Component } from 'react';
import { api } from '../api.js';
import ResponSearch from './ResponSearch'
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

    handleSubmit = (event) => {
        event.preventDefault();
        // this.setState({sumbitted: true})

        if (this.state.idIjazah !== ""){
            api.transactions.get({ id: this.state.idIjazah })
                .then( response => { 
                    if(response.meta.count === 0){
                        this.setState({values: false})
                    } else {
                        this.setState({values: response.data[0].asset}); 
                    }

                    // var datas = response.data;
                    // var temp = ''

                    // // if(response.meta.count > 0){
                    // //     console.log("here 2");
                        

                    // //     temp = datas.map(val => {
                    // //         var t = {
                    // //             nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                    // //             nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',
                    // //             pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                    // //             id: val.id !== undefined ? val.id : 'Nan',
                    // //             niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                    // //             status: val.asset.status !== undefined ? val.asset.status : 'Not Active',
                    // //             photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                    // //             source: 'CariIjazah'
                    // //         }
        
                    // //         return t;
                    // //     })   
                        
                    // //     // this.setState({data: {
                    // //     //     values: temp,
                    // //     //     source: 'CariIjazah',
                    // //     // }, done: true, available: true, submitted: true})
                    // // }

                })
        } else {
        }
    }

    componentWillUnmount() {
        this.setState({done: false});
    }

    handleChange = (event) => {
        event.preventDefault();

        let id = event.target.value;

        this.setState({idIjazah: id});
    }

    resetState(){
        this.setState({sumbitted: false});
        this.state({available:false})
    }

    render() {
        // if (this.state.idIjazah === undefined){
        //     return (
        //         <div className="response">Input tidak boleh kosong!</div>
        //     )
        // } else if (this.state.submitted) { // Kalau data di-submit
        //     if (this.state.available){ // Kalau data ditemukan                 
        //         return (
        //             <div></div>
        //         )
        //     } else { // Kalau data tidak ditemukan
        //         if (!this.state.error) {
        //             return (
        //                 <div className="response">Data ijazah tidak ditemukan!</div>
        //             )
        //         } else {
        //             return (
        //                 <div className="response">Data ijazah tidak ditemukan!</div>
        //             )
        //         }
        //     }
        // } else {

        // }

        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Cari Ijazah</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Masukkan ID Ijazah: <span className="required">*</span></span>
                        <input type="number" id="idIjazah" name="idIjazah" className="input-field" onChange={this.handleChange} />
                    </label> <br/>

                    <input type="submit" value="Submit" />
                </form>
                
                <ResponSearch submitted={this.state.values}/>
            </div>
        );
    }
}
export default HelloTransactions;
