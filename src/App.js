import * as firebase from 'firebase';
import React, { Component } from 'react';
import './App.css';
import Item from './components/Item.js';


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
            <Item firebase={firebase}/>
          </div>
        );
    }
}

export default App;
