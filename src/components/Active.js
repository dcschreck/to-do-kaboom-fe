import React, { Component } from 'react';
import * as firebase from 'firebase';
import Item from './Item.js';

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

class Active extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="active">
                This is your active todo page
                <Item firebase={firebase}/>
            </section>
        );
    }
}

export default Active;
