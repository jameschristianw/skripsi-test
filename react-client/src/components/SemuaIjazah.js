import React, { Component } from 'react';
import { api } from '../api.js';
import DataTable from 'react-data-table-component'

class HelloTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = { data: [], done: false, };

        this.handleChangeFakultas.bind(this)
        this.handleChangeProdi.bind(this)
    }

    componentWillUnmount() {
        this.setState({done: false})
    }

    getFakultasName = (fakultas) => {
        let fakultasName = '';

        if (fakultas === 'fti') fakultasName = "Fakultas Teknik & Informatika"
        else if (fakultas === 'fbisnis') fakultasName = "Fakultas Bisnis"
        else if (fakultas === 'filkom') fakultasName = "Fakultas Ilmu Komunikasi"
        else if (fakultas === 'fsds') fakultasName = "Fakultas Seni & Design"
        else if (fakultas === 'perhotelan') fakultasName = "D3 Perhotelan"

        return fakultasName;
    }

    async fetchData(fakultas, prodi){
        fetch('/get-cert').then(res => {
            // console.log(res.json());
            return res.json();
        }).then(async (result) => {
            console.log(result);

            var temp = [];

            console.log(result.length);
            var counter = 0;

            await result.forEach(async (element) => {
                // console.log(element)
                
                await api.transactions.get({ id: element.id_ijazah })
                .then( response => { 
                    // if(response.meta.count === 0){
                    //     this.setState({values: false})
                    // } else {
                    //     this.setState({values: response.data[0].asset}); 
                    // }

                    // console.log(response);

                    var val = response.data[0];
                    
                    // console.log(temp)

                    if(response.meta.count > 0){
                        // console.log(val.asset.fakultas)

                        console.log(fakultas, prodi)

                        if(fakultas === 'all' && prodi === 'all'){
                            // console.log('its fakultas');
                            
                            let tmp = {
                                nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                                nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',        
                                prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
                                fakultas: val.asset.fakultas !== undefined ? val.asset.fakultas : 'Nan',
                                pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                                id: val.id !== undefined ? val.id : 'Nan',
                                niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                                status: element.status === 1 ? 'Active' : 'Not Active',
                                photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                            }
                            
                            temp.push(tmp);
                        } else if (val.asset.fakultas === fakultas && prodi === 'all') {
                            // console.log('no fakultas');
                            let tmp = {
                                nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                                nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',        
                                prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
                                fakultas: val.asset.fakultas !== undefined ? val.asset.fakultas : 'Nan',
                                pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                                id: val.id !== undefined ? val.id : 'Nan',
                                niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                                status: element.status === 1 ? 'Active' : 'Not Active',
                                photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                            }
                            
                            temp.push(tmp);
                        } else if (fakultas === 'all' && val.asset.prodi === prodi) {
                            // console.log('no fakultas');
                            let tmp = {
                                nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                                nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',        
                                prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
                                fakultas: val.asset.fakultas !== undefined ? val.asset.fakultas : 'Nan',
                                pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                                id: val.id !== undefined ? val.id : 'Nan',
                                niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                                status: element.status === 1 ? 'Active' : 'Not Active',
                                photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                            }
                            
                            temp.push(tmp);
                        } else if (val.asset.fakultas === fakultas && val.asset.prodi === prodi) {
                            // console.log('no fakultas');
                            let tmp = {
                                nama: val.asset.nama !== undefined ? val.asset.nama : 'Nan',
                                nim: val.asset.nim !== undefined ? val.asset.nim : 'Nan',        
                                prodi: val.asset.prodi !== undefined ? val.asset.prodi : 'Nan',
                                fakultas: val.asset.fakultas !== undefined ? val.asset.fakultas : 'Nan',
                                pin: val.asset.pin !== undefined ? val.asset.pin : 'Nan',
                                id: val.id !== undefined ? val.id : 'Nan',
                                niu: val.asset.niu !== undefined ? val.asset.niu : 'Nan',
                                status: element.status === 1 ? 'Active' : 'Not Active',
                                photo: val.asset.photo !== undefined ? val.asset.photo : 'default',
                            }
                            
                            temp.push(tmp);
                        } 
                        // console.log(tmp);
                    }
                }).then( () => {
                    // console.log(this.state.data)
                })

                counter++;
                if(counter === result.length){
                    // console.log('yeay done');
                    // console.log(temp);
                    this.setState({data: {
                        values: temp,
                        source: 'SemuaIjazah',
                    }, done: true})
                }
            })
        })
    }

    async componentDidMount() {
        this.setState({fakultas: 'all', prodi: 'all'})

        this.fetchData('all', 'all');
    }

    handleClick(event) {
        alert(event.target.value);

        var values = {
            id: event.target.value
        }

        fetch('/cert-action', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }).then(response => {
            console.log(response)
        })

        window.location.reload();
    }

    handleChangeFakultas = (event) => {
        // console.log(event.target.value);
        var fakultas = event.target.value;
        var temp;

        // console.log(this.state);

        if(fakultas === 'all') {
            // window.location.reload();
            this.setState({fakultas: 'all'})
        } else {
            this.fetchData(fakultas, 'all');

            temp = this.state.data.values.filter(res => {
                if (res.fakultas === fakultas){
                    console.log(res);
                    
                    return res;
                } else return null;
            })

            // console.log(temp);
            this.setState({data: {
                values: temp
            }, fakultas: fakultas})

            this.forceUpdate();
        }
    }

    handleChangeProdi = (event) => {
        // console.log(event.target.value);
        var prodi = event.target.value;
        var temp;

        // console.log(this.state);

        if(prodi === 'all') {
            // window.location.reload();
            this.setState({prodi: 'all'})
        } else {
            console.log(this.state.fakultas);
            
            this.fetchData(this.state.fakultas, prodi);

            temp = this.state.data.values.filter(res => {
                if (res.prodi === prodi){
                    console.log(res);
                    
                    return res;
                } else return null;
            })

            // console.log(temp);
            this.setState({data: {
                values: temp
            }, prodi: prodi})

            this.forceUpdate();
        }
    }

    handleClickView = (event) => {
        alert(event.target.value);
    }

    setColumns(){
        const columns = [
            {
                name: <label style={{fontSize: '20px'}}>Name</label>,
                sortable: true,
                selector: 'nama',
                width: '330px',
                cell: row => <label style={{fontSize: '20px'}}>{row.nama}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>NIM</label>,
                sortable: true,
                selector: 'nim',
                compact: 'yes',
                width: '150px',
                cell: row => <label style={{fontSize: '20px'}}>{row.nim}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Program Studi</label>,
                sortable: true,
                selector: 'prodi',
                width: '200px',
                cell: row => <label style={{fontSize: '20px'}}>{row.prodi}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Fakultas</label>,
                sortable: true,
                selector: 'fakultas',
                width: '300px',
                cell: row => <label style={{fontSize: '20px'}}>{this.getFakultasName(row.fakultas)}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah UMN</label>,
                sortable: true,
                selector: 'niu',
                width: '280px',
                cell: row => <label style={{fontSize: '20px'}}>{row.niu}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Nomor Ijazah Nasional</label>,
                sortable: true,
                selector: 'pin',
                width: '320px',
                cell: row => <label style={{fontSize: '20px'}}>{row.pin}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Status</label>,
                sortable: true,
                selector: 'status',
                compact: 'yes',
                width: '130px',
                cell: row => <label style={{fontSize: '20px'}}>{row.status === "Active" ? "Aktif" : "Non-Aktif"}</label>
            },
            {
                name: <label style={{fontSize: '20px'}}>Aksi</label>,
                sortable: true,
                selector: 'id',
                compact: 'yes',
                width: '150px',
                cell: row => {
                    if (row.status === 'Active'){
                        return (
                            <div>
                                <button id={row.id} value={row.id} onClick={this.handleClick} style={{marginRight: 10}}>Non-aktifkan</button>
                                <button id={row.id} value={row.id} onClick={this.handleClickView}>Lihat</button>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <button id={row.id} value={row.id} onClick={this.handleClick} style={{marginRight: 10}}>Aktifkan</button>
                                <button id={row.id} value={row.id} onClick={this.handleClickView}>Lihat</button>
                            </div>
                        );
                    }
                }
            },
        ]
        
        return columns;
    }

    onRowClicked = (id) => {

    }

    render() {
        console.log(this.state);
        
        if(!this.state.done) {
            return (
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Semua Ijazah</div>                    
                </div>
            );
        } else {
            console.log(this.state);

            return(
                <div className="content form-style-2">
                    <div className="form-style-2-heading">Semua Ijazah</div>
                    
                    {/* <div> */}
                        <span style={{width: '80px', marginRight: '20px'}}>Fakultas</span>
                    
                        <select className="select-field-all" style={{marginRight: '50px'}} name="fakultas" id="fakultas" onChange={this.handleChangeFakultas}>
                            <option value="all">Semua</option>
                            <option value="fti">Fakultas Teknik & Informatika</option>
                            <option value="fbisnis">Fakultas Bisnis</option>
                            <option value="filkom">Fakultas Ilmu Komunikasi</option>
                            <option value="fsds">Fakultas Seni & Design</option>
                            <option value="perhotelan">D3 Perhotelan</option>
                        </select>
                    {/* </div> */}

                    {/* <div> */}
                        <span style={{width: '80px', marginRight: '20px'}}>Program studi</span>
                    
                        <select className="select-field-all" name="prodi" id="prodi" onChange={this.handleChangeProdi}>
                            <option value="all">Semua</option>
                            <option value="Informatika">Informatika</option>
                            <option value="Sistem Informasi">Sistem Informasi</option>
                            <option value="Teknik Komputer">Teknik Komputer</option>
                            <option value="Teknik Elektro">Teknik Elektro</option>
                            <option value="Teknik Fisika">Teknik Fisika</option>
                            <option value="Manajemen">Manajemen</option>
                            <option value="Akuntansi">Akuntansi</option>
                            <option value="Komunikasi Strategis">Komunikasi Strategis</option>
                            <option value="Jurnalistik">Jurnalistik</option>
                            <option value="Design Komunikasi Visual">Design Komunikasi Visual</option>
                            <option value="Film">Film</option>
                            <option value="Animasi">Animasi</option>
                            <option value="Perhotelan">Perhotelan</option>
                        </select>
                    {/* </div> */}
                    

                    <DataTable
                        columns={this.setColumns()}
                        data={this.state.data.values}
                        noHeader
                    />
                </div>
            )
        }

        
    }
}
export default HelloTransactions;
