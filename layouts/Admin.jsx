/* eslint-disable */
import React, {lazy} from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { learningRoutes, collegeRoutes, expertRoutes, anonymousRoutes } from "routes.js";
import Menu from "@material-ui/icons/Menu";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { connect } from 'react-redux'
import { logout } from "../actions";
import Answers from "views/Forum/Answers.jsx"
import Chat from "views/Messages/Chat.jsx"


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: image,
            color: "purple",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false
        };
    }
    switchRoutes =  routes => (
        <Switch>
            {routes.map((prop, key) => {
                if (prop.layout === "/") {
                    // const RoutMenu = lazy(()=>prop.Component)
                    return (
                        <Route
                            path={prop.layout + prop.path}
                            // component={(props)=><RoutMenu {...props}/>}
                            component={prop.component}
                            key={key}
                        />
                    );
                }
            })}
            <Route
                path="/answers"
                component={Answers}
                key='answers'
            />
            <Route
                path="/chat"
                component={Chat}
                key='chat'
            />
            <Redirect from='/' to={this.props.auth.portal=='Learning'?'/resources':'/forum'} />
        </Switch>
    )

    handleImageClick = image => {
        this.setState({ image: image });
    };
    handleColorClick = color => {
        this.setState({ color: color });
    };
    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({ fixedClasses: "dropdown show" });
        } else {
            this.setState({ fixedClasses: "dropdown" });
        }
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    };
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }
    render() {
        const { classes, ...rest } = this.props;
        const routes = !this.props.auth.isLoggedIn?anonymousRoutes:this.props.auth.portalType==='college'?collegeRoutes:this.props.auth.portalType==='Expert'?expertRoutes:learningRoutes
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={this.props.profile.userName}
                    logo={this.props.profilePicture.uri}
                    //   image={this.state.image}
                    backgroundColor='#6B52C4'
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Hidden mdUp implementation="css">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <div className={classes.container}>
                        {this.switchRoutes(routes)}
                        <Route exact path="/landing" render={() => {window.location.href="landing.html"}} />
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth, profilePicture: state.profilePicture, profile: state.profile
    }
}

export default connect(mapStateToProps, { logout })(withStyles(dashboardStyle)(Dashboard));
