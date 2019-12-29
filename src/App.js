import React, {lazy} from "react"
import { connect } from 'react-redux'
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { login, logout, setProfile } from "./actions";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// core components
import Admin from "layouts/Admin.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography:{
        useNextVariants: true
    },
    palette: {
        primary: {
            main: '#6B52C4'
        }
    },
});

const hist = createBrowserHistory();

class App extends React.Component {
    state = {
        loading: false,
        portal: 'Learning'
    }
    componentWillMount() {
        const user = firebase.auth().currentUser
        firebase.database().ref('users/'+user.uid).once('value', snapshot => {
            const data = snapshot.val()
            this.props.login(data.email, user.uid, data.profilePicture, data.portal)
            this.props.setProfile(
                data.userName,
                data.firstName,
                data.lastName,
                data.companyName,
                data.grade,
                data.homeTown,
                data.aboutMe,
                data.skypeUsername
            )
            this.setState({loading: true, portal: data.portal})
            return
        })
    }
    render() {
        if (!this.state.loading) {
            return (
                <div></div>
            );
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Router history={hist}>
                    <Switch>
                        <Route component={Admin} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth, profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps, { login, logout, setProfile })(App);

