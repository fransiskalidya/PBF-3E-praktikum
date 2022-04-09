import React, { Component } from "react";
import './Mahasiswa.css';
import Data from '../../component/Mahasiswa/Data';

class Mahasiswa extends Component{
    state={
        mahasiswa:[],
        insertMhs: {        // variabel yang digunakan untuk menampung sementara data yang ada di insert
            id: 1,
            NIM: "",
            nama: "",
            alamat: "",
            hp: "",
            angkatan: "",
            status: ""
        }
    }

    ambilDataDariServerAPI=()=>{
        fetch('http://localhost:3001/mahasiswa')
            .then(response=>response.json())
            .then(jsonHasilAmbilDariAPI =>{
                this.setState({
                    mahasiswa: jsonHasilAmbilDariAPI
                })
            })    
    }
    componentDidMount(){
        this.ambilDataDariServerAPI();
    }
    handleHapusData = (data)=>{
        fetch( `http://localhost:3001/mahasiswa/${data}`, {method: 'DELETE'})
            .then(res=>{
                this.ambilDataDariServerAPI()
            })
    }
    handleHapusSemuaData = (data)=>{
        this.state.mahasiswa.map(mahasiswa=>{
            
            fetch( `http://localhost:3001/mahasiswa/${mahasiswa.id}`, {method: 'DELETE'})
            .then(res=>{
                this.ambilDataDariServerAPI()
            })
        })
        
    }

    handleTambahMhs =(event)=>{
        let formInsertMhs = {...this.state.insertMhs};
        let timestamp = new Date().getTime();
        formInsertMhs['id']=timestamp;
        formInsertMhs[event.target.name] = event.target.value;
        this.setState({
            insertMhs: formInsertMhs
        });
    }

    handleSimpan = ()=>{
        fetch('http://localhost:3001/mahasiswa',{
            method : 'post',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(this.state.insertMhs)
        })
            .then((Response)=>{
                this.ambilDataDariServerAPI();
            })
    }

    render(){
        return (
            <div className="cart-mahasiswa">
                <h1>Pendataan Mahasiswa</h1>
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="NIM" className="col-sm-2 col-form-label">NIM</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="NIM" name="NIM" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="alamat" className="col-sm-2 col-form-label">Alamat</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="alamat" name="alamat" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="hp" className="col-sm-2 col-form-label">No. HP</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahMhs}/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambahMhs}/>
                            {/* <select class="form-select" aria-label="Default select example" defaultValue={this.state.selectValue} 
 onChange={this.handleTambahMhs}>
                                <option value="aktif">Aktif</option>
                                <option value="cuti">Cuti</option>
                                <option value="lulus">Lulus</option>
                            </select> */}
                        </div>
                    </div>
                    <button type="submit" name="btn btn-primary" onClick={this.handleSimpan}>Simpan</button>
                    <button type="submit" name="btn btn-primary" onClick={this.handleHapusSemuaData}>Hapus Semua</button>

                </div>
                <h2>Daftar pendataan Mahasiswa</h2>
                {
                    this.state.mahasiswa.map(mahasiswa=>{
                        return <Data key={mahasiswa.id} idMhs={mahasiswa.id} NIM = {mahasiswa.NIM} nama={mahasiswa.nama} alamat={mahasiswa.alamat} hp={mahasiswa.hp} angkatan={mahasiswa.angkatan} status={mahasiswa.status} hapusData={this.handleHapusData}/>//key adalah id pada setiap data
                    })
                }
            </div>
        )
    }
}

export default Mahasiswa;