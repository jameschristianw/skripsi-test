import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SendHello from './InputIjazah';
import HelloTransactions from './SemuaIjazah';
import HelloTransactions2 from './CariIjazah';
import IjazahKu from "./IjazahKu";
import Login from './Login';
import '../App.css';
import '../index.css';
import Logo from '../images/logo-100.png';
import { ErrorHandler } from 'universal-react-logger';
import Cookies from "universal-cookie";

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            error: this.props.error,
            errorInfo: this.props.errorInfo,
            loggedIn: false,
            role: '',
            idIjazah: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.makeError = this.makeError.bind(this);
    }

    handleClick(){
        this.setState(({counter}) => ({
            counter: counter + 1
        }))
    }

    makeError(){
        try{
            console.log("This is some error");
        } catch (error){
            this.props.setEventError(error);
        }
    }

    componentWillMount(info){
        var temp = new Cookies();
        var cookie = temp.get('SID');
        var res = "";

        if (cookie !== undefined){
            res = atob(cookie);
            var mail = res.slice(0, res.indexOf('#'));
            var role = res.slice(res.indexOf('#')+1, res.indexOf('&'));
            var mes = {
                email: mail
            }

            fetch('/validate-email', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mes)
            })
            .then(res => res.json())
            .then(result => {
                if (result.length !== 0){
                    this.setState({loggedIn: true});
                    this.setState({role: role});
                    this.setState({idIjazah: result[0].id_ijazah})
                }
            }).finally(() => {
            })
        }
    }

    render(){
        var state = this.state;

        var LoggedIn = () => {
            if (!state.loggedIn) {
                return (
                    <div className="sub-title">
                        <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>
                        <Link to="/login" className="sub-content">Login</Link>
                    </div>
                )
            } else {
                if (state.role === "student"){
                    return (
                        <div className="sub-title">
                            <Link to="/ijazahku" className="sub-content">Ijazahku</Link>
                            <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>  
                            <Link to="/login" className="sub-content">Profil</Link>
                        </div>
                    )
                } else {
                    return (
                        <div className="sub-title">
                            <Link to="/input-ijazah" className="sub-content">Input Ijazah</Link>                 
                            <Link to="/semua-ijazah" className="sub-content">Semua Ijazah</Link>
                            <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>
                            <Link to="/login" className="sub-content">Profil</Link>
                        </div>
                    )
                }
            }
        }

        return (
            <Router>
                <div>
                    <div className="title">
                        <h2><img src={Logo} className="img-logo" alt=""/><Link to="/">Portal Ijazah Elektronik UMN</Link></h2>
                        <LoggedIn />
                    </div>
                    
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/input-ijazah">
                            <SendHello />
                        </Route>
                        <Route path="/semua-ijazah">
                            <HelloTransactions />
                        </Route>
                        <Route path="/cari-ijazah">
                            <HelloTransactions2 />
                        </Route>
                        <Route path="/ijazahku">
                            <IjazahKu idIjazah={this.state.idIjazah}/>
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default ErrorHandler(App, true);

/* Functional components */

function Home() {
    return (
        <div className="content">
            <h3>Selamat datang di Portal Ijazah Elektronik UMN</h3>
            <p>Portal ini digunakan untuk membuat ijazah yang di keluarkan Universitas Multimedia Nusantara di dalam blockchain dan memungkinkan alumni melihat atau mengambil ijazah jika dibutuhkan</p>
        </div>
    );
}