import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Danger from "components/Typography/Danger.jsx";
import Success from "components/Typography/Success.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter";
import { connect } from 'react-redux'
import { logout } from "../../actions";
import firebase from 'firebase/app'
import 'firebase/auth'

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    tableUpgradeWrapper: {
        display: "block",
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        MsOverflowStyle: "-ms-autohiding-scrollbar"
    },
    table: {
        width: "100%",
        maxWidth: "100%",
        marginBottom: "1rem",
        backgroundColor: "transparent",
        borderCollapse: "collapse",
        display: "table",
        borderSpacing: "2px",
        borderColor: "grey",
        "& thdead tr th": {
            fontSize: "1.063rem",
            padding: "12px 8px",
            verticalAlign: "middle",
            fontWeight: "300",
            borderTopWidth: "0",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            textAlign: "inherit"
        },
        "& tbody tr td": {
            padding: "12px 8px",
            verticalAlign: "middle",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)"
        },
        "& td, & th": {
            display: "table-cell"
        }
    },
    center: {
        textAlign: "center"
    }
};

function Signout(props) {
    const { classes, logout } = props;
    return (
        <GridContainer >
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color='primary'>
                        <h4 className={classes.cardTitleWhite}>
                        X-Purt
                        </h4>
                        {/* <p className={classes.cardCategoryWhite}>
                            Are you looking for more components? Please check our Premium
                            Version of Material Dashboard Angular.
                        </p> */}
                    </CardHeader>
                    <CardBody>
                        <div className={classes.tableUpgradeWrapper}>
                            <table className={classes.table}>
                                {/* <thead>
                                    <tr>
                                        <th />
                                        <th className={classes.center}>Free</th>
                                        <th className={classes.center}>PRO</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    <tr>
                                        {/* <td>Contact address</td> */}
                                        {/* <td className={classes.center}>joshuaoj@stanford.edu</td> */}
                                        {/* <td className={classes.center}>200</td> */}
                                    </tr>
                                    {/* <tr>
                                        <td>Plugins</td>
                                        <td className={classes.center}>2</td>
                                        <td className={classes.center}>10</td>
                                    </tr>
                                    <tr>
                                        <td>Example Pages</td>
                                        <td className={classes.center}>7</td>
                                        <td className={classes.center}>28</td>
                                    </tr>
                                    <tr>
                                        <td>Login, Register, Pricing, Lock Pages</td>
                                        <td className={classes.center}>
                                            <Danger>
                                                <Close />
                                            </Danger>
                                        </td>
                                        <td className={classes.center}>
                                            <Success>
                                                <Check />
                                            </Success>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            ReactTables, ReactVectorMap, ReactSweetAlert, Wizard,
                                            Validation, ReactBigCalendar etc...
                                        </td>
                                        <td className={classes.center}>
                                            <Danger>
                                                <Close />
                                            </Danger>
                                        </td>
                                        <td className={classes.center}>
                                            <Success>
                                                <Check />
                                            </Success>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mini Sidebar</td>
                                        <td className={classes.center}>
                                            <Danger>
                                                <Close />
                                            </Danger>
                                        </td>
                                        <td className={classes.center}>
                                            <Success>
                                                <Check />
                                            </Success>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Premium Support</td>
                                        <td className={classes.center}>
                                            <Danger>
                                                <Close />
                                            </Danger>
                                        </td>
                                        <td className={classes.center}>
                                            <Success>
                                                <Check />
                                            </Success>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td className={classes.center}>Free</td>
                                        <td className={classes.center}>Just $59</td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td className={classes.center}>
                                            <Button round disabled>
                                                Current Version
                                            </Button>
                                        </td>
                                        <td className={classes.center}>
                                            <Button
                                                round
                                                color="danger"
                                                href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=md-free-react-upgrade-live"
                                            >
                                                Upgrade to Pro
                                             </Button>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button
                            color="primary" round
                            href = "mailto: joshuaoj@stanford.edu"
                        >
                            Feedback
                        </Button>
                        <Button round variant='outlined'
                            onClick={()=>{
                                sessionStorage.setItem("mode", "signout");
                                firebase.auth().signOut()
                            }}
                        >
                            Sign Out
                        </Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, {logout})(withStyles(styles)(Signout));
