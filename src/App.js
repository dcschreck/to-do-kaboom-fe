import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import Active from './components/Active.js';
import Historical from './components/Historical.js';
import * as firebase from 'firebase';

// <script src="https://www.gstatic.com/firebasejs/5.3.1/firebase.js"></script>
// <script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRLwG9vGt1X-vVI9F_k-ntLalvb67V5po",
    authDomain: "to-do-kaboom-fe.firebaseapp.com",
    databaseURL: "https://to-do-kaboom-fe.firebaseio.com",
    projectId: "to-do-kaboom-fe",
    storageBucket: "to-do-kaboom-fe.appspot.com",
    messagingSenderId: "605120402420"
};
firebase.initializeApp(config);
// </script>

class App extends Component {
    render() {
        return (
          <div className="App">
              <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/active'>Active To-Dos</Link></li>
                        <li><Link to='/historical'>Historical To-Dos</Link></li>
                    </ul>
                </nav>
                <h1>To-Do KaBoom </h1>
              </header>
              <main>
                <Route exact path="/" component={Home} />
                <Route path="/active" render={(props) => <Active {...props} firebase={firebase}/> } />
                <Route path="/historical" render={(props) => <Historical {...props} firebase={firebase}/> } />
              </main>
          </div>
        );
    }
}

export default App;
