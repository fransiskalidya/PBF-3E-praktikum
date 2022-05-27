import { Component } from "react/cjs/react.production.min";
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';


export default class Create extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('mahasiswas');
    this.unsubscribe = null;
    this.state = {
      mahasiswas: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const mahasiswas = [];
    querySnapshot.forEach((doc) => {
      const { Nama, Kelas, NIM, Prodi, status } = doc.data();
      mahasiswas.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Nama,
        Kelas,
        NIM,
        Prodi,
        status
      });
    });
    this.setState({
      mahasiswas
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete(id){
    firebase.firestore().collection('mahasiswas').doc(id).delete().then(()=>{
      console.log("Documment successfully deleted!");
      this.props.history.push("/")
    }).catch((error)=>{
      console.error("Error removing document: ", error);
    })
  }
  render() {

    return (
      <div>
        <Navbar />
        <div className="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Data Mahasiswa
              </h3>
            </div>
            <h4><Link to="/createMhs" class="btn btn-primary">Tambah Data</Link></h4>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Prodi</th>
                  <th>NIM</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.mahasiswas.map(mahasiswas =>
                  <tr>
                    <th>{mahasiswas.Nama}</th>
                    <td>{mahasiswas.Kelas}</td>
                    <td>{mahasiswas.Prodi}</td>
                    <td>{mahasiswas.NIM}</td>
                    <td>{mahasiswas.status}</td>
                    <td>
                    <Link to={`/editMhs/${this.state.key}`} class="btn btn-sm btn-warning">Edit</Link>&nbsp;
                    <button className="btn btn-sm btn-danger"  onClick={this.delete.bind(this, this.state.key)}  data-toggle="modal" data-target="#exampleModalLong">Hapus</button>

                    </td>
                    
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}