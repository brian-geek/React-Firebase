import React from 'react'
import './Account.css'
import { Tabs, Tab, Form, Button, Overlay, Popover, Alert, DropdownButton, Dropdown } from 'react-bootstrap'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { logout } from "./actions"
import { connect } from 'react-redux'
import { FaChevronRight } from 'react-icons/fa'
import Slider from '@material-ui/core/Slider'
import MultiSelect from "@khanacademy/react-multi-select"
import { specialties } from './const'
import Landing from './landing'

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'signin',
            portal: this.props.portal,
            isSignup: false,
            isSignin: false,
            isCreate: false,
            email: '',
            userName: '',
            firstName: '',
            lastName: '',
            companyName: '',
            grade: '',
            photo: null,
            password1: '',
            password2: '',
            remember: true,
            agreeterm: false,
            visibleWarnOfTooltip: false,
            warnOfTarget: null,
            tipMsg: null,
            alermsg: '',
            alertdanger: false,
            alertsuccess: false,
            alertemailverify: false,
            screen: this.props.screen,
            isReset: false,
            price: 140,
            specialties: [],
            availabilityPreferences: '',
            typeExpert: '',
            yearsInField: ''
        }
        this.showlanding = this.showlanding.bind(this);
    }
    
    showlanding = () => {
        ReactDOM.render(<Landing />, document.getElementById('root'));
    }
    
    assign_chkterm = target => this.chkterm = target
    assign_controlpass2 = target => this.controlpass2 = target
    assign_specialties = target => this.specialties = target
    assign_availabilityPreferences = target => this.availabilityPreferences = target
    assign_typeExpert = target => this.typeExpert = target
    assign_yearsInField = target => this.yearsInField = target
    
    componentWillMount() {
        this.props.logout()
    }
    render() {
        return (
            <div>
                <div className='splite left'>
                    <div className='centered'>
                        <p><a  className='appname' onClick = {this.showlanding}>X-Purt</a></p>
                        {
                            // this.state.activeKey == 'signup' &&
                            // <p className='customer'>{this.state.portal}</p>
                        }
                    </div>
                    {
                        // this.state.activeKey == 'signup' &&
                        // <div className='rightIcon'>
                        //     <FaChevronRight className='FaChevronRight' onClick={()=>{
                        //         if (this.state.portal === 'student') {
                        //             this.setState({portal: 'consultant'})
                        //         } else {
                        //             this.setState({portal: 'student'})
                        //         }
                        //     }} />
                        // </div>
                    }
                </div>
                <div className='splite main'>
                   <Alert dismissible variant="danger" className='signalert'
                        onClose={() => {
                            this.setState({ alertdanger: false })
                        }}
                        show={this.state.alertdanger}
                    >
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            {this.state.alermsg}
                        </p>
                    </Alert>
                    <Alert dismissible variant="success" className='signalert'
                        onClose={() => {
                            this.setState({ alertsuccess: false })
                        }}
                        show={this.state.alertsuccess}
                    >
                        <Alert.Heading>Hey, nice to see you!</Alert.Heading>
                        <p>
                            {this.state.alermsg}
                        </p>
                    </Alert>
                    <Alert dismissible variant="danger" className='signalert'
                        onClose={() => {
                            this.setState({ alertemailverify: false })
                        }}
                        show={this.state.alertemailverify}
                    >
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            'You have not verified your email account. Would you like us to resend the email verification link?'
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => {
                                firebase.auth().currentUser.sendEmailVerification()
                                this.setState({ alertemailverify: false })
                            }}
                                variant="outline-success">
                                Send verification email again!
                            </Button>
                        </div>
                    </Alert>
                    {

                        this.state.screen === 'signin' &&
                            <Tabs
                                className='signtab'
                                activeKey={this.state.activeKey}
                                defaultActiveKey='signin'
                                variant='tabs'
                                onSelect={key => this.setState({ activeKey: key })}
                            >
                                <Tab title='Sign In'
                                    eventKey='signin'
                                >
                                    <Form>
                                        <Form.Group controlId="formBasicEmail1" className='formgroup'>
                                            <Form.Label>Enter Your Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" className='forminput'
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword1" className='formgroup'>
                                            <Form.Label>Enter Your Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" className='forminput'
                                                onChange={e => this.setState({ password1: e.target.value })}
                                                value={this.state.password1}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicChecbox1" className='formgroup'>
                                            <Form.Check type="checkbox" label='Remember me' className='inline'
                                                defaultChecked
                                                onChange={e => this.setState({ remember: e.target.checked })}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" size='lg' className='lgbtn'
                                            onClick={!this.state.isSignin ? this.signIn.bind(this) : null}
                                            disabled={this.state.isSignin}
                                        >
                                            <span>Sign In</span>
                                        </Button>
                                        <Button className='linkbtn' variant="link" style={{ paddingLeft: '30px' }}
                                            onClick={this.goPassresetScreen.bind(this)}
                                        >Forgot your password?</Button>
                                    </Form>
                                </Tab>
                                <Tab title='Sign Up'
                                    eventKey='signup'
                                >
                                    <Form
                                        onSubmit={this.signUp.bind(this)}
                                    >
                                        <Form.Group controlId="formBasicEmail2" className='formgroup'>
                                            <Form.Label>Enter Your Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" className='forminput'
                                                onChange={e => this.setState({ email: e.target.value })}
                                                required
                                                value={this.state.email}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword2" className='formgroup'>
                                            <Form.Label>Enter Your Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" className='forminput'
                                                onChange={e => this.setState({ password1: e.target.value })}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formConfirmPassword" className='formgroup'>
                                            <Form.Label>Confirm Your Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm Password" className='forminput'
                                                onChange={e => this.setState({ password2: e.target.value })}
                                                ref={this.assign_controlpass2}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicChecbox2" className='formgroup'>
                                            <Form.Check type="checkbox" label='I agree to the' className='inline'
                                                onChange={e => this.setState({ agreeterm: e.target.checked })}
                                                ref={this.assign_chkterm}

                                            />
                                            <Button className='linkbtn' variant="link" style={{ paddingLeft: '5px' }}
                                            >
                                            Terms of Service
                                            </Button>
                                        </Form.Group>
                                        <Button variant="primary" size='lg' className='lgbtn' type='submit'
                                            disabled={this.state.isSignup}
                                        >
                                            <span>Sign Up</span>
                                        </Button>
                                    </Form>
                                </Tab>
                            </Tabs>
                    }
                    {
                        this.state.screen === 'passreset' &&
                            <Form
                                onSubmit={this.resetPassword.bind(this)}
                            >

                                <p className='title'>Password Reset</p>
                                <p className='subtitle'>Let's help you get a new password!</p>
                                <Form.Group controlId="formBasicEmail3" className='formgroup'>
                                    <Form.Label>Enter Your Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" className='forminput'
                                        onChange={e => this.setState({ email: e.target.value })}
                                        required
                                        value={this.state.email}
                                    />
                                </Form.Group>
                                <Button variant="primary" size='lg' className='lgbtn' type='submit'
                                    disabled={this.state.isReset}
                                >
                                    <span>Continue</span>
                                </Button>
                                <Button className='linkbtn' variant="link" style={{ paddingLeft: '30px' }}
                                    onClick={this.goSigninScreen.bind(this)}
                                >
                                Go to sign in?
                                </Button>
                            </Form>
                    }
                    {
                        this.state.screen === 'accountinfo' &&
                        <Form
                            onSubmit={this.createUser.bind(this)}
                        >
                            <p className='title'>Welcome!</p>
                            <p className='subtitle'>Let's sign you up for Xpurt</p>
                            <Form.Group controlId="formBasicPortal" className='formgroup'>
                                <Form.Label>Are you learning a skill or are you an expert?</Form.Label>
                                <DropdownButton
                                    size="lg"
                                    className='portalDropdownButton'
                                    title={this.state.portal}
                                >
                                    <Dropdown.Item eventKey="Learning" className='portalitem' onClick={()=>{this.setState({portal: 'Learning'})}}>Learning</Dropdown.Item>
                                    <Dropdown.Item eventKey="Expert" className='portalitem' onClick={()=>{this.setState({portal: 'Expert'})}}>Expert</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                            {
                                this.state.portal == 'Learning' &&
                                <div>
                                <Form.Group controlId="formBasicUserName" className='formgroup'>
                                    <Form.Label>Make a username<span className='required'> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Jone123" className='forminput'
                                        onChange={e => this.setState({ userName: e.target.value.trim() })}
                                        required
                                        value={this.state.userName}
                                    />
                                </Form.Group>
                                {/* <Form.Group controlId="formBasicSchoolName" className='formgroup'>
                                    <Form.Label>Your current school?<span className='required'> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Bay Area High School" className='forminput'
                                        onChange={e => this.setState({ companyName: e.target.value })}
                                        required
                                        value={this.state.companyName}
                                    />
                                </Form.Group>
                                <Form.Group className='formgroup'>
                                    <Form.Label>Grade</Form.Label>
                                    <Form.Control type="text" placeholder="2 years" className='forminput'
                                        onChange={e => this.setState({ grade: e.target.value })}
                                        value={this.state.grade}
                                    />
                                </Form.Group> */}
                                </div>
                            }
                            {
                                this.state.portal == 'Expert' &&
                                <div>
                                <Form.Group controlId="formBasicUserName" className='formgroup'>
                                    <Form.Label>What's your first name?<span className='required'> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Jone" className='forminput'
                                        onChange={e => this.setState({ firstName: e.target.value.trim() })}
                                        required
                                        value={this.state.firstName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicUserName" className='formgroup'>
                                    <Form.Label>What's your last name?<span className='required'> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Dou" className='forminput'
                                        onChange={e => this.setState({ lastName: e.target.value.trim() })}
                                        required
                                        value={this.state.lastName}
                                    />
                                </Form.Group>
                                {/* <Form.Group controlId="formBasicSchoolName" className='formgroup'>
                                    <Form.Label>Your current school or company?<span className='required'> *</span></Form.Label>
                                    <Form.Control type="text" placeholder="Bay Area High School" className='forminput'
                                        onChange={e => this.setState({ companyName: e.target.value })}
                                        required
                                        value={this.state.schoolName}
                                    />
                                </Form.Group> */}
                                </div>
                            }
                            <Form.Group controlId="formBasicPhoto" className='formgroup'>
                                <Form.Label>Upload a profile picture? (optional)</Form.Label>
                                <Form.Control type="file" className='forminput'
                                    onChange={e => this.setState({ photo: e.target.files[0] })}
                                />
                            </Form.Group>
                            <Form.Group className='formgroup'>
                                <Form.Label>Note: Fields marked(<span className='required'>*</span>) is required</Form.Label>
                                <br />
                                <Button variant="primary" size='lg' className='lgbtn' type='submit'
                                    disabled={this.state.isCreate}
                                >
                                    <span>Continue</span>
                                </Button>
                                <Button className='linkbtn' variant="link" style={{ paddingLeft: '30px' }}
                                    onClick={this.goSigninScreen.bind(this)}
                                >
                                Sign out?
                                </Button>
                            </Form.Group>
                        </Form>
                    }
                    {
                        this.state.screen == 'preference' &&
                        <Form
                            onSubmit={this.createPreference.bind(this)}
                        >
                            <p className='title'>Welcome!</p>
                            <p className='subtitle'>Let's tailor your Xpurt experience!</p>
                            <Form.Group controlId="formBasicPrice" className='formgroup'>
                                <Form.Label>Your hourly price? <span className='highlight'>${this.state.price}/h</span><span className='required'> *</span></Form.Label>
                                <Slider
                                    className='slider'
                                    min={5}
                                    max={250}
                                    step={1}
                                    value={this.state.price}
                                    aria-labelledby="label"
                                    onChange={this.handlePriceChange}
                                />
                            </Form.Group>
                            {/* <Form.Group controlId="formBasicSpecialities" className='formgroup' >
                                <Form.Label
                                >
                                Set consultant specialities<span className='required'> *</span></Form.Label>
                                <MultiSelect
                                    ref={this.assign_specialties}
                                    options={specialties}
                                    selected={this.state.specialties}
                                    onSelectedChanged={specialties => this.setState({specialties})}
                                />
                            </Form.Group> */}
                            {/* <Form.Group controlId="formBasicPortal" className='formgroup'>
                                <Form.Label>Set Availability Preferences<span className='required'> *</span></Form.Label>
                                <DropdownButton
                                    ref={this.assign_availabilityPreferences}
                                    size="lg"
                                    className='preferenceDropdownButton'
                                    title={this.state.availabilityPreferences?this.state.availabilityPreferences:'Set availability preference'}
                                >
                                    <Dropdown.Item eventKey="Just Hourly or Less" onClick={()=>{this.setState({availabilityPreferences: 'Just Hourly or Less'})}}>Just Hourly or Less</Dropdown.Item>
                                    <Dropdown.Item eventKey="Just Packages (10+ hours)" onClick={()=>{this.setState({availabilityPreferences: 'Just Packages (10+ hours)'})}}>Just Packages (10+ hours)</Dropdown.Item>
                                    <Dropdown.Item eventKey="Both Hourly and Package" onClick={()=>{this.setState({availabilityPreferences: 'Both Hourly and Package'})}}>Both Hourly and Package</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group> */}
                            <Form.Group controlId="formBasicCategory" className='formgroup'>
                                <Form.Label>What is your area of expertise?<span className='required'> *</span></Form.Label>
                                <DropdownButton
                                    ref={this.assign_typeExpert}
                                    size="lg"
                                    className='preferenceDropdownButton'
                                    title={this.state.typeExpert?this.state.typeExpert:'Pick a category'}
                                >
                                    <Dropdown.Item eventKey="Nutrition" onClick={()=>{this.setState({typeExpert: 'Nutrition'})}}>Nutrition</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sewing or Knitting" onClick={()=>{this.setState({typeExpert: 'Sewing or Knitting'})}}>Sewing or Knitting</Dropdown.Item>
                                    <Dropdown.Item eventKey="Woodworking or Whittling" onClick={()=>{this.setState({typeExpert: 'Woodworking or Whittling'})}}>Woodworking or Whittling</Dropdown.Item>
                                    <Dropdown.Item eventKey="Visual Art" onClick={()=>{this.setState({typeExpert: 'Visual Art'})}}>Visual Art</Dropdown.Item>
                                    <Dropdown.Item eventKey="Fitness and Health" onClick={()=>{this.setState({typeExpert: 'Fitness and Health'})}}>Fitness and Health</Dropdown.Item>

                                    {/* <Dropdown.Item eventKey="Current College Student" onClick={()=>{this.setState({typeExpert: 'Current College Student'})}}>Current College Student</Dropdown.Item> */}
                                </DropdownButton>
                            </Form.Group>
                            <Form.Group controlId="formBasicYears" className='formgroup'>
                                <Form.Label>Years in Field<span className='required'> *</span></Form.Label>
                                <DropdownButton
                                    ref={this.assign_yearsInField}
                                    size="lg"
                                    className='preferenceDropdownButton'
                                    title={this.state.yearsInField?this.state.yearsInField:'Years in Field'}
                                >
                                    <Dropdown.Item eventKey="0-1 years" onClick={()=>{this.setState({yearsInField: '0-1 years'})}}>0-1 years</Dropdown.Item>
                                    <Dropdown.Item eventKey="2-3 years" onClick={()=>{this.setState({yearsInField: '2-3 years'})}}>2-3 years</Dropdown.Item>
                                    <Dropdown.Item eventKey="4-5 years" onClick={()=>{this.setState({yearsInField: '4-5 years'})}}>4-5 years</Dropdown.Item>
                                    <Dropdown.Item eventKey="> 5 years" onClick={()=>{this.setState({yearsInField: '> 5 years'})}}>> 5 years</Dropdown.Item>
                                </DropdownButton>
                            </Form.Group>
                            <Form.Group className='formgroup'>
                                {/* <Form.Label>Note: Fields marked(<span className='required'>*</span>) is required</Form.Label> */}
                                <br />
                                <Button variant="primary" size='lg' className='lgbtn' type='submit'
                                    disabled={this.state.isCreate} 
                                >
                                    <span>Continue</span>
                                </Button>
                                <Button className='linkbtn' variant="link" style={{ paddingLeft: '30px' }}
                                    onClick={this.goSigninScreen.bind(this)}
                                >
                                Sign out?
                                </Button>
                            </Form.Group>
                        </Form>
                    }
                </div>
                <Overlay target={this.state.warnOfTarget} show={this.state.visibleWarnOfTooltip} placement='top'>
                    {props => (
                        <Popover {...props} className='tooltip' title='warning'>
                            {this.state.tipMsg}
                        </Popover>
                    )}
                </Overlay>
            </div>
        )
    }

    handlePriceChange = (event, value) => {
        this.setState({ price: value });
    };

    signIn(e) {
        e.preventDefault()
        this.setState({ isSignin: true })
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password1)
            .then(() => {
                const user = firebase.auth().currentUser
                if (!user) {
                    this.setState({ alertdanger: true, alertsuccess: false, alertemailverify: false, alermsg: "Can't get user account.", isSignin: false })
                    return
                }
                if (!user.emailVerified) {
                    this.setState({ alertemailverify: true, alertdanger: false, alertsuccess: false, isSignin: false })
                    return
                }
                this.goAccountinfoScreen()
            })
            .catch(error => {
                this.setState({ alertdanger: true, alertsuccess: false, alertemailverify: false, alermsg: error.message, isSignin: false })
                return
            })
    }

    signUp(e) {
        e.preventDefault()
        if (this.state.password1 !== this.state.password2) {
            this.setState({ visibleWarnOfTooltip: true, warnOfTarget: this.controlpass2, tipMsg: 'Passwords do not match.' })
            setTimeout(() => {
                this.setState({ visibleWarnOfTooltip: false })
            }, 3000)
            return
        }
        if (!this.state.agreeterm) {
            this.setState({ visibleWarnOfTooltip: true, warnOfTarget: this.chkterm, tipMsg: 'You have to agree our terms of service to sign up.' })
            setTimeout(() => {
                this.setState({ visibleWarnOfTooltip: false })
            }, 3000)
            return
        }
        this.setState({ isSignup: true })
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password1)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification()
                    .then(() => {
                        this.setState({
                            activeKey: 'signin',
                            alertsuccess: true,
                            alertdanger: false,
                            alertemailverify: false,
                            alermsg: 'We have sent a verification email to you. Please check your inbox! You can verify your email and sign in to Xpurt!',
                            isSignup: false
                        })
                        return
                    })
            })
            .catch(error => {
                this.setState({ alertdanger: true, alertsuccess: false, alertemailverify: false, alermsg: error.message, isSignup: false })
                return
            })
    }

    goPassresetScreen() {
        this.setState({ screen: 'passreset' })
    }

    goSigninScreen() {
        const user = firebase.auth().currentUser
        if (user) {
            firebase.auth().signOut()
            this.props.logout()
        }
        this.setState({ screen: 'signin' })
    }

    goAccountinfoScreen() {
        const user = firebase.auth().currentUser
        firebase.database().ref('users').orderByChild('email').equalTo(user.email).once('value', snapshot=>{
            if (!snapshot.exists()) {
                this.setState({ screen: 'accountinfo' })
                return
            }
            ReactDOM.render(<Provider store={this.props.store}><App /></Provider>, document.getElementById('root'));
            return
        })
    }

    resetPassword(e) {
        e.preventDefault()
        this.setState({ isReset: true })
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState({
                    activeKey: 'signin',
                    alertsuccess: true,
                    alertdanger: false,
                    alertemailverify: false,
                    alermsg: 'We have sent you password reset email. Please check your inbox! You can then sign in Xpurt!',
                    isReset: false
                })
                return

            })
            .catch(error => {
                this.setState({ alertdanger: true, alertsuccess: false, alertemailverify: false, alermsg: error.message, isReset: false })
                return
            })
    }

    createUser(e) {
        e.preventDefault()
        this.setState({isCreate: true})
        const user = firebase.auth().currentUser
        if (this.state.photo) {
            const pictureRef = firebase.storage().ref().child(`${user.uid}_avatar`);
            pictureRef.put(this.state.photo, { contentType: 'image/jpg' })
            .then(() => {
                if (this.state.portal == 'Learning') {
                    pictureRef.getDownloadURL()
                    .then((profilePicture)=>{
                        firebase.database().ref('users/'+user.uid).set({
                            email: user.email,
                            userName: this.state.userName,
                            portal: 'Learning',
                            profilePicture,
                            companyName: this.state.companyName,
                            grade: this.state.grade,
                            aboutMe: '',
                            skypeUsername: '',                   
                        })
                        .then(()=>{
                            this.setState({isCreate: false})
                            ReactDOM.render(<Provider store={this.props.store}><App /></Provider>, document.getElementById('root'));
                        })
                    })
                } else if (this.state.portal == 'Expert') {
                    pictureRef.getDownloadURL()
                    .then((profilePicture)=>{
                        firebase.database().ref('users/'+user.uid).set({
                            email: user.email,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            portal: 'Expert',
                            profilePicture,
                            companyName: this.state.companyName,
                            aboutMe: '',
                            skypeUsername: '',                   
                        })
                        .then(()=>{
                            this.setState({isCreate: false, screen: 'preference'})
                        })
                    })
                }
            });
        } else {
            if (this.state.portal == 'Learning') {
                firebase.database().ref('users/'+user.uid).set({
                    email: user.email,
                    userName: this.state.userName,
                    portal: 'Learning',
                    companyName: this.state.companyName,
                    grade: this.state.grade,
                    aboutMe: '',
                    skypeUsername: ''
                })
                .then(()=>{
                    this.setState({isCreate: false})
                    ReactDOM.render(<Provider store={this.props.store}><App /></Provider>, document.getElementById('root'));
                })
            } else if (this.state.portal == 'Expert') {
                firebase.database().ref('users/'+user.uid).set({
                    email: user.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName, 
                    portal: 'Expert',
                    companyName: this.state.companyName,
                    // aboutMe: '',
                    // skypeUsername: ''
                })
                .then(()=>{
                    this.setState({isCreate: false, screen: 'preference'})
                })
            }
        }
    }

    createPreference(e) {
        e.preventDefault()
        // if (this.state.specialties.length == 0) {
        //     this.setState({visibleWarnOfTooltip: true, warnOfTarget: this.specialties, tipMsg: 'Set Expert Specialties'})
        //     setTimeout(() => {
        //         this.setState({ visibleWarnOfTooltip: false })
        //     }, 3000)
        //     return
        // }
        // if (this.state.availabilityPreferences == '') {
        //     this.setState({visibleWarnOfTooltip: true, warnOfTarget: this.availabilityPreferences, tipMsg: 'Set Availability Preferences'})
        //     setTimeout(() => {
        //         this.setState({ visibleWarnOfTooltip: false })
        //     }, 3000)
        //     return
        // }
        if (this.state.typeExpert == '') {
            this.setState({visibleWarnOfTooltip: true, warnOfTarget: this.typeExpert, tipMsg: 'Pick a category'})
            setTimeout(() => {
                this.setState({ visibleWarnOfTooltip: false })
            }, 3000)
            return
        }
        if (this.state.yearsInField == '') {
            this.setState({visibleWarnOfTooltip: true, warnOfTarget: this.yearsInField, tipMsg: 'Set Years in Field'})
            setTimeout(() => {
                this.setState({ visibleWarnOfTooltip: false })
            }, 3000)
            return
        }
        this.setState({isCreate: true})
        const user = firebase.auth().currentUser
        firebase.database().ref('experts/'+user.uid).set({
            approved: 1,
            // availabilityPreferences: this.state.availabilityPreferences,
            price: this.state.price,
            // specialties: this.state.specialties,
            typeExpert: this.state.typeExpert, 
            yearsInField: this.state.yearsInField
        }
        , _error=>{
            this.setState({isCreate: false})
            ReactDOM.render(<Provider store={this.props.store}><App /></Provider>, document.getElementById('root'));
        })
    }

}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, {logout})(Account);

