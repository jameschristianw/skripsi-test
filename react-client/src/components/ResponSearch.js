import React, { Component } from 'react'
import DataTable from 'react-data-table-component'

class Response extends Component {
    constructor(props){
        super(props)

        this.handleClick.bind(this)
    }

    handleClick = (event) => {
        alert(event.target.value)
    }

    setColumns(){
        const columns = [
            {
                name: <label style={{fontSize: '20px'}}>Name</label>,
                sortable: true,
                selector: 'nama',
                cell: row => <label style={{fontSize: '20px'}}>{row.nama}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>NIM</label>,
                sortable: true,
                selector: 'nim',
                cell: row => <label style={{fontSize: '20px'}}>{row.nim}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah UMN</label>,
                sortable: true,
                selector: 'niu',
                cell: row => <label style={{fontSize: '20px'}}>{row.niu}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah Nasional</label>,
                sortable: true,
                selector: 'pin',
                cell: row => <label style={{fontSize: '20px'}}>{row.pin}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Status</label>,
                sortable: true,
                selector: 'status',
                cell: row => <label style={{fontSize: '20px'}}>{row.status}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Action</label>,
                sortable: true,
                selector: 'id',
                cell: row => <div><button id={row.id} value={row.id} onClick={this.handleClick}>Alert Me</button></div>
            },
        ]
        
        return columns;
    }

    render() {
        var datas = this.props.submitted;
        
        console.log(datas);
        // console.log(datas.nama)
        // console.log(datas.photo === undefined)
        console.log(datas.source);

        if (datas.source === 'SemuaIjazah'){ //Semua ijazah
            return(
                <DataTable
                    columns={this.setColumns()}
                    data={datas.values}
                    noHeader
                />
            )
        } else { //Cari Ijazah
            var x = datas.values;
            x = x['0'];
            console.log(x);
            // console.log(x.nama)
            //     return (
            //         <div className="response">
            //             <img src={datas.values.photo}/>

            //             <label>Nama: </label>                        
            //         </div>
            //     )
        }

        return null;

        
    }
}

export default Response;