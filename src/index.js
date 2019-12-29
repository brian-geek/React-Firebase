import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import {firebaseConfig} from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Account from './Account';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './reducers';
import Landing from './landing';

firebase.initializeApp(firebaseConfig);
const store = createStore(Reducers);

firebase.auth().onAuthStateChanged(user=>{
    if (user && user.emailVerified) {
        const uid = firebase.auth().currentUser.uid
        firebase.database().ref('users/'+uid).once('value', snapshot=>{
            if (!snapshot.exists()) {
                ReactDOM.render(<Provider store={store}><Account screen='accountinfo' portal='Learning' store={store}/></Provider>, document.getElementById('root'));
                return
            }
            const portal = snapshot.val().portal
            if (portal === 'Learning') {
                ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
                return
            }
            if (portal === 'Expert') {
                firebase.database().ref('experts/'+uid).once('value', snapshot=>{
                    if (!snapshot.exists()) {
                        ReactDOM.render(<Provider store={store}><Account screen='preference' portal='Expert' store={store}/></Provider>, document.getElementById('root'));
                        return
                    } else {
                        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
                    }
                })        
            }

        })
    } else {
        const mode = sessionStorage.getItem("mode");
        if (mode == 'openreact' || mode == 'signout') {
            ReactDOM.render(<Provider store={store}><Account screen='signin' store={store} portal='Learning'/></Provider>, document.getElementById('root'));
        } else {
            ReactDOM.render(<Landing />, document.getElementById('root'));
        }
    }
});
