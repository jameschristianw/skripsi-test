import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SendHello from './Hello';
import HelloTransactions from './HelloTransactions';
import HelloTransactions2 from './HelloTransactions2';
import Login from './Login';
import '../App.css';
import '../index.css';
import Logo from '../images/logo-100.png';
import { useHistory } from 'react-router-dom'
// import log from 'loglevel';
// import remote from 'loglevel-plugin-remote';
import { ErrorHandler } from 'universal-react-logger';
import Cookies from "universal-cookie";

// The pages of this site are rendered dynamically
// in the browser (not server rendered).

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            error: this.props.error,
            errorInfo: this.props.errorInfo,
            loggedIn: false
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
        // console.log(info)
        var temp = new Cookies();
        var cookie = temp.get('SID');
        var res = "";

        console.log(cookie);
        if (cookie !== undefined){
            res = atob(cookie);
            res = res.slice(0, res.indexOf('#'));
            console.log(res);

            var mes = {
                email: res
            }

            // console.log(JSON.stringify(mes));

            fetch('/validate-email', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(mes)
            })
            .then(res => res.json())
            .then(result => {
                if (result.length !== 0){
                    this.setState({loggedIn: true});
                }
                // console.log(this.state);
            }).finally(() => {
                // this.shouldComponentUpdate(1);
                
                // console.log(this.state);
            })
        }
    }

    render(){
        var state = this.state;
        console.log('app render');

        var LoggedIn = () => {
            if (!state.loggedIn) {
                return (
                    <div className="sub-title">
                        {/* <Link to="/input-ijazah" className="sub-content">Input Ijazah</Link>                  */}
                        {/* <ul><Link to="/semua-ijazah">Semua Ijazah</Link></ul> */}
                        <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>
                        <Link to="/login" className="sub-content">Login</Link>
                    </div>
                )
            } else {
                return (
                    <div className="sub-title">
                        <Link to="/input-ijazah" className="sub-content">Input Ijazah</Link>                 
                        <Link to="/semua-ijazah" className="sub-content">Semua Ijazah</Link>
                        <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>
                        <Link to="/login" className="sub-content">Logout</Link>
                    </div>
                )
            }
        }

        return (
            <Router>
                <div>
                    <div className="title">
                        <h2><img src={Logo} className="img-logo"/><Link to="/">Portal Ijazah Elektronik UMN</Link></h2>
                        <LoggedIn />
                        {/* <div className="sub-title">
                            <Link to="/input-ijazah" className="sub-content">Input Ijazah</Link>                 
                            <ul><Link to="/semua-ijazah">Semua Ijazah</Link></ul>
                            <Link to="/cari-ijazah" className="sub-content">Cari Ijazah</Link>
                            <Link to="/login" className="sub-content">Login</Link>
                        </div> */}
                    </div>
                    
                        
                    {/* <hr /> */}
    
                    {/*
                      A <Switch> looks through all its children <Route>
                      elements and renders the first one whose path
                      matches the current URL. Use a <Switch> any time
                      you have multiple routes, but you want only one
                      of them to render at a time
                    */}
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

//back up
/*
return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <hr />
                    <h3> Interact </h3>
                    <li><Link to="/new-account">New Account</Link></li>
                    <li><Link to="/faucet">Faucet</Link></li>
                    <li><Link to="/send-transfer">Send tokens</Link></li>
                    <li><Link to="/send-hello">Send Hello</Link></li>
                    <hr />
                    <h3> Explore </h3>
                    <li><Link to="/accounts">Accounts</Link></li>
                    <li><Link to="/hello-accounts">Hello accounts</Link></li>
                    <li><Link to="/transactions">Transactions</Link></li>
                    <li><Link to="/hello-transactions">Hello transactions</Link></li>
                    <li><Link to="/blocks">Blocks</Link></li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/new-account">
                        <NewAccount />
                    </Route>
                    <Route path="/faucet">
                        <Faucet />
                    </Route>
                    <Route path="/send-transfer">
                        <SendTransfer />
                    </Route>
                    <Route path="/send-hello">
                        <SendHello />
                    </Route>
                    <Route path="/accounts">
                        <Accounts />
                    </Route>
                    <Route path="/hello-accounts">
                        <HelloAccounts />
                    </Route>
                    <Route path="/blocks">
                        <Blocks />
                    </Route>
                    <Route path="/transactions">
                        <Transactions />
                    </Route>
                    <Route path="/hello-transactions">
                        <HelloTransactions />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
*/
