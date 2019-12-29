import React from "react";
// @material-ui/core components
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { connect } from 'react-redux'
import avatar from "assets/img/faces/marc.jpg";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { Modal } from 'react-bootstrap'
import { login, setProfile } from "../../actions"

const styles = theme => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    Button: {
        height: 40,
        borderRadius: 20,
        margin: 10,
        '&:focus': {
            outline: 'none'
        },
    },
})

class UserProfile extends React.Component {
    state = {
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        companyName: this.props.profile.companyName,
        // grade: this.props.profile.grade,
        homeTown: this.props.profile.homeTown,
        aboutMe: this.props.profile.aboutMe,
        skypeUsername: this.props.profile.skypeUsername,
        profilePicture: this.props.profilePicture,
        showModal: false,
        updateDisable: false
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color='primary'>
                                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                                <p className={classes.cardCategoryWhite}>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="User Name"
                                            id="userName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            readOnly
                                            value={this.props.profile.userName}
                                            // onChange={(event) => {
                                            //     this.setState({ userName: event.target.value.trim() })
                                            // }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Email address"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            readOnly
                                            value={this.props.auth.email}
                                            // onChange={(event) => {
                                            //     this.setState({ email: event.target.value.trim() })
                                            // }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="First Name"
                                            id="firstName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.firstName}
                                            onChange={(event) => {
                                                this.setState({ firstName: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Last Name"
                                            id="lastName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.lastName}
                                            onChange={(event) => {
                                                this.setState({ lastName: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={event => {
                                                this.setState({ profilePicture: { uri: window.URL.createObjectURL(event.target.files[0]), file: event.target.files[0] } })
                                            }}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <CardAvatar profile>
                                                <img src={this.state.profilePicture.uri} alt="..." />
                                            </CardAvatar>
                                        </label>
                                        {/* <Card profile>
                                        <CardAvatar profile>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img src={avatar} alt="..." />
                                            </a>
                                        </CardAvatar>
                                        <CardBody profile>
                                            <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                                            <p className={classes.description}>
                                                Don't be scared of the truth because we need to restart the
                                                human foundation in truth And I love you like Kanye loves Kanye
                                                I love Rick Owens’ bed design but the back is...
                                            </p>
                                            <Button color="primary" round>
                                                Follow
                                            </Button>
                                        </CardBody>
                                    </Card> */}
                                        {/* <CustomInput
                                        labelText="Company (disabled)"
                                        id="company-disabled"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true
                                        }}
                                    /> */}
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Company Name (optional)"
                                            id="companyName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.companyName}
                                            onChange={(event) => {
                                                this.setState({ companyName: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                    {/* <GridItem xs={12} sm={12} md={2}>
                                        <CustomInput
                                            labelText="Grade"
                                            id="Grade"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.grade}
                                            onChange={(event) => {
                                                this.setState({ grade: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Hometown"
                                            id="Hometown"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.homeTown}
                                            onChange={(event) => {
                                                this.setState({ homeTown: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            labelText="Skype User ID"
                                            id="skypeUsername"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.skypeUsername}
                                            onChange={(event) => {
                                                this.setState({ skypeUsername: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                                        <CustomInput
                                            labelText="About me"
                                            id="about-me"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 5
                                            }}
                                            value={this.state.aboutMe}
                                            onChange={(event) => {
                                                this.setState({ aboutMe: event.target.value })
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button variant="contained" color="primary" classes={{root: classes.Button}}
                                disabled={this.state.updateDisable}
                                onClick={() => {
                                    this.setState({updateDisable: true})
                                    const uid = this.props.auth.uid
                                    if (this.state.profilePicture.file) {
                                        const pictureRef = firebase.storage().ref().child(`${uid}_avatar`);
                                        pictureRef.put(this.state.profilePicture.file, { contentType: 'image/jpg' })
                                        .then(() => {
                                            pictureRef.getDownloadURL()
                                            .then((profilePicture) => {
                                                firebase.database().ref('users/' + uid).update({
                                                    firstName: this.state.firstName,
                                                    lastName: this.state.lastName,
                                                    homeTown: this.state.homeTown,
                                                    profilePicture,
                                                    companyName: this.state.companyName,
                                                    // grade: this.state.grade,
                                                    aboutMe: this.state.aboutMe,
                                                    skypeUsername: this.state.skypeUsername,
                                                })
                                                .then(() => {
                                                    this.setState({showModal: true, updateDisable: false})
                                                    this.props.setProfile(
                                                        this.props.profile.userName,
                                                        this.state.firstName,
                                                        this.state.lastName,
                                                        this.state.companyName,
                                                        // this.state.grade,
                                                        this.state.homeTown,
                                                        this.state.aboutMe,
                                                        this.state.skypeUsername
                                                    )
                                                })
                                            })
                                            .catch(error=>{
                                                console.log(error)
                                            })
                                        });
                                    } else {
                                        firebase.database().ref('users/' + uid).update({
                                            firstName: this.state.firstName,
                                            lastName: this.state.lastName,
                                            companyName: this.state.companyName,
                                            homeTown: this.state.homeTown,
                                            // grade: this.state.grade,
                                            aboutMe: this.state.aboutMe,
                                            skypeUsername: this.state.skypeUsername,
                                            })
                                            .then(() => {
                                                this.setState({showModal: true, updateDisable: false})
                                                this.props.setProfile(
                                                    this.props.profile.userName,
                                                    this.state.firstName,
                                                    this.state.lastName,
                                                    this.state.companyName,
                                                    // this.state.grade,
                                                    this.state.homeTown,
                                                    this.state.aboutMe,
                                                    this.state.skypeUsername
                                                )
                                            })
                                    }
                                }}>
                                    Update Profile
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                            <h4 className={classes.cardTitle}>Alec Thompson</h4>
                            <p className={classes.description}>
                                Don't be scared of the truth because we need to restart the
                                human foundation in truth And I love you like Kanye loves Kanye
                                I love Rick Owens’ bed design but the back is...
                            </p>
                            <Button color="primary" round>
                                Follow
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem> */}
                </GridContainer>
                <Modal
                    show={this.state.showModal} onHide={()=>this.setState({showModal: false})}
                >
                    <Modal.Header>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your profile has been updated!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" onClick={()=>this.setState({showModal: false})} classes={{root: classes.Button}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        profilePicture: state.profilePicture,
        profile: state.profile
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {login, setProfile})(withStyles(styles)(UserProfile));
