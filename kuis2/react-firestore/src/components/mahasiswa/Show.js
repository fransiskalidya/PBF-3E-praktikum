import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mahasiswas: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('mahasiswas').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    mahasiswas: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    delete(id) {
        firebase.firestore().collection('mahasiswas').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/home")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            <div class="container">
                <div className="card bg-light mb-3 text-center" style={{ maxWidth: "30rem", marginTop: "100px", marginLeft: "300px" }}>
                    <div className="card-header">
                        <h2>Detail Mahasiswa</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div class="form-group text-left">
                                <label for="Nama">Nama</label>
                                <input type="Nama" name="Nama" disabled class="form-control" value={this.state.mahasiswas.Nama} />
                            </div>
                            <div class="form-group text-left">
                                <label for="Kelas" >Kelas</label>
                                <input type="Kelas" name="Kelas" disabled class="form-control" value={this.state.mahasiswas.Kelas} />
                            </div>
                            <div class="form-group text-left">
                            <label for="NIM" >NIM</label>
                                    <input type="NIM" name="NIM" disabled class="form-control" value={this.state.mahasiswas.NIM}/>
                                </div>
                            <div class="form-group text-left">
                            <label for="Prodi">Prodi</label>
                                    <input type="Prodi" name="Prodi" disabled class="form-control" value={this.state.mahasiswas.Prodi}/>
                                
                                </div>
                            <div class="form-group text-left">
                            <label for="status">status</label>
                                    <input type="status" name="status" disabled class="form-control" value={this.state.mahasiswas.status}/>
                            </div>
                            <div>
                                <span className="text-left">
                                    <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Hapus</button>
                                    <button style={{ marginLeft: "10px" }} class="btn btn-warning"><Link to={`/editMhs/${this.state.key}`} style={{ color: "white" }}>Edit</Link></button>
                                    <button style={{ marginLeft: "10px" }} class="btn btn-success"><Link to={`/home`} style={{ color: "white" }}>Kembali</Link></button>

                                </span>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Show;
