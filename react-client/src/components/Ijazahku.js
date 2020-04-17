import React, { Component } from 'react'

class Ijazahku extends Component {

    constructor(props) {
        super(props)
        this.state = {
            LoggedIn: false,
        }
    }

    componentWillMount() { // Cek udah log in apa blm
        
    }

    render () {
        var state = this.state;

        var LoggedIn = () => {
            if (state.LoggedIn){
                return (
                    <div>Rencananya bakal bisa tampilin ijazah sendiri disini</div>
                )
            } else {
                return (
                    <div>Anda harus login terlebih dahulu</div>
                )
            }
        }

        return (
            <div className="content">
                <LoggedIn />
            </div>
        )
    }
}

export default Ijazahku