import React, {useState} from 'react';
import ReactDOM from "react-dom";
import './Style.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

import {Switch, BrowserRouter as Router, Route, Link} from "react-router-dom";
import routes from './Routes';
import Header from './Header';

import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);

function App(){
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
      Is Logged In? {JSON.stringify(isLoggedIn)}
      <div className='App'>
        <Router>
          <Header />
          <span>
            <Link to="/" style={{margin: "5px"}}>Join</Link>
            
            <Link to="/login" style={{margin: "5px"}}>Login</Link>

          </span>
          <Switch>
         
            {routes.map(route=>(
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
