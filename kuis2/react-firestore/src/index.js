import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Index from './components/mahasiswa/Index';
import EditMhs from './components/mahasiswa/Edit';
import CreateMhs from './components/mahasiswa/Create';
import ShowMhs from './components/mahasiswa/Show';


ReactDOM.render(
  <Router>
      <div>
        {/* <Route exact path='/' component={App} /> */}
        <Route path='/show/:id' component={Show} />
        <Route path='/edit/:id' component={Edit} />
        <Route path='/create' component={Create} />

{/* kuis */}
        <Route exact path='/' component={Index} />
        <Route path='/login'  component={Login}/>
        {/* <Redirect from='/' to='/login'/> */}
        <Route path='/register' component={Register} />
        <Route path='/editMhs/:id' component={EditMhs} />
        <Route path='/createMhs' component={CreateMhs} />
        <Route path='/showMhs/:id' component={ShowMhs} />
      </div>
  </Router>,
  document.getElementById('root')
);
serviceWorker.unregister();