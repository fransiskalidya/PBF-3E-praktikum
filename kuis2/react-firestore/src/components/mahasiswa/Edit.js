import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            Nama: '',
            Kelas: '',
            NIM: '',
            Prodi: '',
            status: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const mahasiswa = doc.data();
                this.setState({
                    key: doc.id,
                    Nama: mahasiswa.Nama,
                    Kelas: mahasiswa.Kelas,
                    NIM: mahasiswa.NIM,
                    Prodi: mahasiswa.Prodi,
                    status: mahasiswa.status
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ mahasiswa: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { Nama, Kelas, NIM, Prodi, status } = this.state;

        const updateRef = firebase.firestore().collection('mahasiswas').doc(this.state.key);
        updateRef.set({
            Nama,
            Kelas,
            NIM,
            Prodi,
            status
        }).then((docRef) => {
            this.setState({
                key: '',
                Nama: '',
                Kelas: '',
                NIM: '',
                Prodi: '',
                status: ''
            });
            this.props.history.push("/showMhs/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Edit Mahasiswa
                        </h3>
                    </div>
                    <div class="panel-body">
                        {/* <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Article List</Link></h4> */}
                        <br></br>
                        <div class="card">
                            <div class="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group row">
                                        <label for="Nama" class="col-sm-2 col-form-label">
                                            Nama
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="Nama"
                                                name="Nama"
                                                onChange={this.onChange}
                                                class="form-control"
                                                value={this.state.Nama}
                                                id="Nama"
                                                placeholder="Nama"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="Kelas" class="col-sm-2 col-form-label">
                                            Kelas
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="Kelas"
                                                name="Kelas"
                                                onChange={this.onChange}
                                                class="form-control"
                                                value={this.state.Kelas}
                                                id="Kelas"
                                                placeholder="Kelas"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="NIM" class="col-sm-2 col-form-label">
                                            NIM
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="NIM"
                                                name="NIM"
                                                onChange={this.onChange}
                                                value={this.state.NIM}
                                                class="form-control"
                                                id="NIM"
                                                placeholder="NIM"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="Prodi" class="col-sm-2 col-form-label">
                                            Prodi
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="Prodi"
                                                name="Prodi"
                                                onChange={this.onChange}
                                                value={this.state.Prodi}
                                                class="form-control"
                                                id="Prodi"
                                                placeholder="Prodi"
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="status" class="col-sm-2 col-form-label">
                                            status
                                        </label>
                                        <div class="col-sm-10">
                                            <input
                                                type="status"
                                                name="status"
                                                onChange={this.onChange}
                                                value={this.state.status}
                                                class="form-control"
                                                id="status"
                                                placeholder="status"
                                            />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div
                                        className="container text-left"
                                        style={{ padding: "0px" }}
                                    >
                                        <span className="btn1">
                                            <button type="submit" className="btn btn-success">
                                                Submit
                                            </button>
                                            <button
                                                style={{ marginLeft: "10px" }}
                                                class="btn btn-secondary"
                                            >
                                                <Link to="/home" style={{ color: "white" }}>
                                                    Kembali
                                                </Link>
                                            </button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
