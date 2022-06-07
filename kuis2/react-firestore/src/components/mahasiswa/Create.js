import { Component } from "react/cjs/react.production.min";
import Navbar from './Navbar';
import firebase from "../../Firebase";
import { Link } from 'react-router-dom';

class Create extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('mahasiswas');
        this.state = {
            Nama: '',
            Kelas: '',
            NIM: '',
            Prodi: '',
            status: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { Nama, Kelas, NIM, Prodi, status } = this.state;
        this.ref.add({
            Nama,
            Kelas,
            NIM,
            Prodi,
            status
        }).then((docRef) => {
            this.setState({
                Nama: '',
                Kelas: '',
                NIM: '',
                Prodi: '',
                status: ''
            });
            this.props.history.push("/home")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
    }
    render() {
        const { Nama, Kelas, NIM, Prodi, status } = this.state;
        return (
            <div>
                <Navbar />
                <div class="container">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                Tambah Data Mahasiswa
                            </h3>
                        </div>
                        <br></br>
                        <div class="card">
                        <div class="card-body">
                        
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group row">
                                <label for="Nama" class="col-sm-2 col-form-label">Nama</label>
                                <div class="col-sm-10">
                                    <input type="Nama" name="Nama" onChange={this.onChange} class="form-control" id="Nama" placeholder="Nama"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="Kelas" class="col-sm-2 col-form-label">Kelas</label>
                                <div class="col-sm-10">
                                    <input type="Kelas" name="Kelas" onChange={this.onChange} class="form-control" id="Kelas" placeholder="Kelas"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="NIM" class="col-sm-2 col-form-label">NIM</label>
                                <div class="col-sm-10">
                                    <input type="NIM" name="NIM" onChange={this.onChange} class="form-control" id="NIM" placeholder="NIM"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="Prodi" class="col-sm-2 col-form-label">Prodi</label>
                                <div class="col-sm-10">
                                    <input type="Prodi" name="Prodi" onChange={this.onChange} class="form-control" id="Prodi" placeholder="Prodi"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="status" class="col-sm-2 col-form-label">status</label>
                                <div class="col-sm-10">
                                    <input type="status" name="status" onChange={this.onChange} class="form-control" id="status" placeholder="status"/>
                                </div>
                            </div>
                            <br>
                            </br>
                            <div className="container text-left" style={{padding:"0px"}}>
                            <span className="btn1">
                                <button type="submit" className="btn btn-success">Submit</button>
                                <button style={{marginLeft:"10px"}} class="btn btn-secondary"><Link to="/home" style={{color:"white"}}>Kembali</Link></button>
                            </span>
                        </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Create;