import React, { Component } from "react";
import { api } from '../api.js';
import Cookies from "universal-cookie";
var md5 = require('md5');

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            exist: false,
        }
    }

    handleChange = (event) => {
        event.preventDefault();
    
        let temp = event.target.value;
        let name = event.target.name;
        let value = temp;

        if (name === "password") {
            value = md5(temp);
        }
    
        this.setState({[name]: value});
  
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let input = {
            email: this.state.email,
            password: this.state.password
        }
        
    
        fetch('/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(input)
        })
        .then(res => res.json())
        .then(result => {
            if (result.length === 0) {
                console.log('kosong')
            } else {
                console.log('yeay bisa masuk')
                console.log(result);
                var today = new Date();

                console.log(today.getMonth())

                //Crate cookie
                var startDate = "";
                startDate = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + "-" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();

                var endDay = today.getDate();
                var endMonth = today.getMonth();
                var endYear = today.getFullYear();

                if(today.getMonth() % 2 == 0 && today.getMonth() <= 7){ // Bulan jan - juni
                    if (today.getMonth() == 2) { // Cek apakah bulan februari
                        if (this.isLeapYear(today.getFullYear())){ // Cek tahun kabisat
                            if (today.getDate() + 7 > 29) {
                                endMonth = endMonth + 1;
                                endDay = (endDay + 7) - 29;
                            } else {
                                endDay = endDay + 7;
                            }
                        } else {
                            if (today.getDate() + 7 > 28) {
                                endMonth = endMonth + 1;
                                endDay = (endDay + 7) - 28;
                            } else {
                                endDay = endDate + 7;
                            }
                        }
                    } else { // kalo bukan bulan februari
                        if (today.getMonth() % 2 == 1) { // januari maret mei juli
                            if (today.getDate() + 7 > 31) {
                                endMonth = endMonth + 1;
                                endDay = (endDay + 7) - 31;
                            } else {
                                endDay = endDay + 7;
                            }
                        } else {
                            if (today.getDate() + 7 > 30) { // april juni
                                endMonth = endMonth + 1;
                                endDay = (endDay + 7) - 30;
                            } else {
                                endDay = endDay + 7;
                            }
                        }
                    }
                } else { // Bulan agustus - desember
                    endYear = today.getFullYear();
                    if (today.getMonth() % 2 == 0){ // agustus oktober desember
                        if (today.getDate() + 7 > 31) { // akhir bulan
                            endMonth = endMonth + 1;
                            endDay = (endDay + 7) - 31;
                            if (today.getMonth() === 12) { // kalau bukan akhir tahun
                                endYear = endYear + 1;
                            } 
                        } else { // bukan akhir bulan
                            endDay = endDay + 7;
                        }
                    } else { // september november
                        if (today.getDate() + 7 > 30) { // akhir bulan
                            endMonth = endMonth + 1;
                            endDay = (endDay + 7) - 30;
                        } else { // bukan akhir bulan
                            endDay = endDay + 7;
                        }
                    }

                }

                var endDate = endDay + "/" + endMonth + "/" + endYear + "-" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();

                console.log("startDate: " + startDate);
                console.log("endDate: " + endDate);
                console.log(result[0].email, result[0].id);

                var cookie = result[0].email + "#" + result[0].id + "#" + endDate;

                const cookies = new Cookies();
                const encodedCookie = new Buffer(cookie).toString('base64');
                cookies.set('SID', encodedCookie, {path: '/'});
                console.log(cookies.get('SID'));
            }
        })
    }

    isLeapYear(year){
        if (year % 400 === 0 || year % 40 === 0 || year % 4 === 0){
            return true;
        }
        return false;
    }

    render(){

        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Login</div>
                {/* <h2>Cari Ijazah</h2> */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Email: <span className="required">*</span></span>
                        <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} />
                    </label> <br/>

                    <label>
                        <span>Password: <span className="required">*</span></span>
                        <input type="password" id="password" name="password" className="input-field" onChange={this.handleChange} />
                    </label> <br/>
                    {/* <label>
                        Masukkan ID Ijazah:
                        <input type="text" id="idIjazah" name="idIjazah" onChange={this.handleChange}/>
                    </label> */}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Login;