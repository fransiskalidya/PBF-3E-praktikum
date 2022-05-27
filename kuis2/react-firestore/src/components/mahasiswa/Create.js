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
            this.props.history.push("/")
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
                        <form>
                        <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Create;