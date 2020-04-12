import React, { Component } from "react";
import { api } from '../api.js';

class Login extends Component {
    // constructor(props){}

    render(){

        return (
            <div className="content form-style-2">
                <div className="form-style-2-heading">Login</div>
                {/* <h2>Cari Ijazah</h2> */}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Email: <span className="required">*</span></span>
                        <input type="number" id="email" name="email" className="input-field" onChange={this.handleChange} />
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