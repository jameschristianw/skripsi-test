import React, { Component } from "react";
import Cookies from "universal-cookie";
var md5 = require('md5');

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            exist: true,
            loggedIn: false,
            error: false,
            name: '',
            role: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    componentWillMount() {
        var temp = new Cookies();
        var cookie = temp.get('SID');
        var res = "";

        if (cookie !== undefined){
            res = atob(cookie);
            res = res.slice(0, res.indexOf('#'));

            var mes = {
                email: res
            }

            fetch('/validate-email', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mes)
            })
            .then(res => res.json())
            .then(result => {
                if (result.length !== 0){
                    this.setState({loggedIn: true, name: result[0].fullname, role: result[0].role, email: result[0].email});
                }
            }).finally(() => {
                this.forceUpdate();
            })
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
  
        this.shouldComponentUpdate(0);
    }

    shouldComponentUpdate(val) {
        if(val === 1){
            return true;
        }
        return false;
    }

    handleSubmit = (event) => {
        event.preventDefault()

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
                this.setState({exist: false});
                this.setState({error: true});
            } else {
                var today = new Date();

                var endDay = today.getDate();
                var endMonth = today.getMonth();
                var endYear = today.getFullYear();

                if(today.getMonth() % 2 === 0 && today.getMonth() <= 7){ // Bulan jan - juni
                    if (today.getMonth() === 2) { // Cek apakah bulan februari
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
                                endDay = endDay + 7;
                            }
                        }
                    } else { // kalo bukan bulan februari
                        if (today.getMonth() % 2 === 1) { // januari maret mei juli
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
                    if (today.getMonth() % 2 === 0){ // agustus oktober desember
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

                var cookie = result[0].email + "#" + result[0].role + "&" + endDate;

                const cookies = new Cookies();
                const encodedCookie = new Buffer(cookie).toString('base64');
                cookies.set('SID', encodedCookie, {path: '/'});
                cookies.set('ijazahId', result[0].id_ijazah)
                this.setState({name: result[0].name})
            }
        })
        .finally( (res) => {
            this.setState({exist: true, loggedIn: true,})
            window.location.reload();
        })
    }

    logout() {
        var cookie = new Cookies();
        cookie.remove('SID');
        cookie.remove('ijazahId');
        window.location.reload();
    }

    isLeapYear(year){
        if (year % 400 === 0 || year % 40 === 0 || year % 4 === 0){
            return true;
        }
        return false;
    }

    render(){
        var state = this.state;
        var ErrorLogIn = () => {
            if (state.error) {
                return (
                    <div>Masukkan email dan password yang sesuai</div>
                )
            } else return null;
        }

        var Layout = () => {
            if (!state.loggedIn) {
                return(
                    <div>
                        <div className="form-style-2-heading">Login</div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <span>Email: <span className="required">*</span></span>
                                <input type="text" id="email" name="email" className="input-field" onChange={this.handleChange} />
                            </label> <br/>
    
                            <label>
                                <span>Password: <span className="required">*</span></span>
                                <input type="password" id="password" name="password" className="input-field" onChange={this.handleChange} />
                            </label> <br/>

                            <input type="submit" value="Submit" />
                            
                            <ErrorLogIn />
                        </form>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className="form-style-2-heading">Hai {state.name}!</div>
                        <p>Saat ini anda sedang masuk di Portal Ijazah UMN. Tekan tombol dibawah untuk keluar.</p>
                        <button onClick={this.logout}>Logout</button>
                    
                    </div>
                )
            }
        }

        return (
            <div className="content form-style-2">
                <Layout loggedIn={this.state.loggedIn} />
            </div>
        )
    }
}

export default Login;