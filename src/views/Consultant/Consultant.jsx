import AppBar from '@material-ui/core/AppBar'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import firebase from 'firebase/app'
import 'firebase/database'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
//import CardHeader from "components/Card/CardHeader.jsx";
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { FaDollarSign, FaUniversity, FaMapMarkerAlt, FaCheckCircle, FaMoneyCheck, FaExclamation } from 'react-icons/fa'
import group_124 from '../../assets/img/Group_124.png'
import starEmpty from '../../assets/img/star-empty.png'
import starFull from '../../assets/img/star-full.png'
import { Modal, Overlay, Popover, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap'
import './Consultant.css'
import Calendar from 'react-calendar'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { apiKey, ServerAddress, chargeUrl, dataTimes } from '../../const'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import FilterButton from '../../components/FilterButton/FilterButton'
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'
import moment from 'moment'
import Rating from 'react-rating'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Link from '@material-ui/core/Link'
import MultiSelect from "@khanacademy/react-multi-select"
import { specialties } from '../../const'
import Slider from '@material-ui/core/Slider'
import IconButton from '@material-ui/core/IconButton'
var timezoneJS = require("timezone-js");
var tzdata = require("tzdata");

var _tz = timezoneJS.timezone;
_tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD;
_tz.loadZoneDataFromObject(tzdata);
// import '../../../node_modules/timezone-js/src/date.js'
var userData;


const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    AppBar: {
        backgroundColor: 'white',
        color: 'grey',
        boxShadow: 'none'
    },
    pic: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: theme.spacing(3),
        '&:focus': {
            outline: 'none'
        },
        height: 35
    },
    GridItem: {
        marginBottom: 20
    },
    Card: {
        borderRadius: 20,
        margin: 10
    },
    CardHeader: {
        backgroundColor: theme.palette.primary.main,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    AvatarBig: {
        marginRight: 10,
        width: 100,
        height: 100,
    },
    Avatar: {
        marginRight: 20
    },
    GridList: {
        // cellHeight: 50
    },
    consultantName: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    userVerified: {
        color: '#36BA3B'
    },
    ModalHeader: {
        // backgroundColor: theme.palette.primary.main,
        // overflow: 'hidden',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // height: 80,
        justifyContent: 'start',
    },
    Calendar: {
        width: '60%',
        display: 'inline',
        float: 'left',

    },
    timeSlot: {
        width: '40%',
        float: 'left',
        overflow: 'auto',
        maxHeight: '350px'
    },
    timeSlotSelected: {
        backgroundColor: theme.palette.primary.main + ' !important',
    },
    ListItemTextSelected: {
        color: 'white !important'
    },
    confirmList: {
        width: '50%',
        display: 'inline',
        float: 'left'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '80%'
    },
    priceItem: {
        justifyContent: 'space-between',
        fontSize: '12px'
    },
    tooltip: {
        color: theme.palette.primary.main
    },
    icon: {
        width: '25px',
        height: '25px'
    },
    italic: {
        fontStyle: 'italic',
        height: '50vh'
    },
    Slider: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // padding: '22px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        // flexDirection: 'column'
    }
});

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    state = {
        disableBtn: false
    }
    async submit(ev) {
        this.setState({disableBtn: true})
        try {
            let { token } = await this.props.stripe.createToken({ name: "Name" });
            this.setState({disableBtn: false})
            this.props.finishCheckout(token)
        } catch {
            this.setState({disableBtn: false})
            this.props.finishCheckout(null)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="checkout">
                <p>Type card infomation!</p>
                <CardElement 
                />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.disableBtn}
                    classes={{
                        root: classes.button
                    }}
                    onClick={this.submit}
                    style={{
                        float: 'right'
                    }}
                >
                    Pay
                </Button>
            </div>
        );
    }
}

class Consultant extends React.Component {
    state = {
        expertData: [],
        showModalExpert: false,
        showModalExpertMore: false,
        showModalCalender: false,
        showModalConfirm: false,
        showModalCheckout: false,
        showTooltip: false,
        showModalResult: false,
        tooltipTarget: null,
        tooltipMsg: '',
        timeSlots: [],
        seletedDate: new Date(),
        appointmentGoal: '',
        checkoutResult: false,
        checkoutMsg: '',
        pIndex: 0,
        selectedPrice: 140,
        selectedSmaller: true,
        selectedYear: null,
        selectedName: '',
        selectedSpecialties: null,
        selectedPreferences: null,
        selectedCategory: null
    }

    componentWillMount() {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=cb5487441087406ba850ed9bf87f4245')
            .then((res) => res.json())
            .then((result) => {
                userData = result
            })
        this.refresh()
    }

    refresh() {
        const expertData = []
        firebase.database().ref('experts').once('value', snapshot => {
            const experts = snapshot.val()
            const keys = Object.keys(experts)
            keys.forEach((key, i)=>{
                const expert = experts[key]
                if (expert.approved != 1) {
                    return
                }
                firebase.database().ref('users/' + key).once('value', snapshot => {
                    const user = snapshot.val()
                    if (user) {
                        if (user.profilePicture) {
                            expert['profilePicture'] = user.profilePicture
                        }
                        expert.uid = key
                        expert.userName = user.firstName + ' ' + user.lastName
                        expert.homeTown = user.homeTown ? user.homeTown: "No HomeTown Specified"
                        firebase.database().ref('appointments').orderByChild('expertID').equalTo(key).once('value', snapshot=>{
                            var rating = 0
                            const data = snapshot.val()
                            if (data != null) {
                                var rateCount = 0
                                for (const key in data) {
                                    if (data[key].isPaid && data[key].rating != undefined) {
                                        rateCount++
                                        rating += data[key].rating
                                    }
                                }
                                rating = rating/rateCount
                            }
                            expert.rating = rating
                            expertData.push(expert)
                            // if ((i+1) === keys.length) {
                                this.setState({expertData: expertData.filter(expert=>{
                                    if (this.state.selectedName) {
                                        if (expert.userName.toLowerCase().indexOf(this.state.selectedName) === -1) {
                                            return false
                                        }
                                    }
                                    if (this.state.selectedPrice) {
                                        if (this.state.selectedSmaller) {
                                            if (expert.price > this.state.selectedPrice) {
                                                console.log('return false1')
                                                return false
                                            }
                                        } else {
                                            if (expert.price < this.state.selectedPrice) {
                                                console.log('return false2')
                                                return false
                                            }
                                        }
                                    }
                                    if (this.state.selectedYear) {
                                        if (expert.yearsInField != this.state.selectedYear) {
                                            return false
                                        }
                                    }
                                    if (this.state.selectedSpecialties) {
                                        if (!expert.typeExpert.includes(this.state.selectedSpecialties)) {
                                            return false
                                        }
                                    }
                                    if (this.state.selectedPreferences) {
                                        if (expert.selectedPreferences != this.state.selectedPreferences) {
                                            return false
                                        }
                                    }
                                    if (this.state.selectedCategory) {
                                        if (expert.typeExpert != this.state.selectedCategory) {
                                            return false
                                        }
                                    }
                                    return true
                                })})
                            // }
                        })
                    }
                })
            })
        })
    }

    buildGridItemExpert(expert) {
        if (expert == null) {
            return null
        }
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null

        return (
            <Card
                key={expert.uid}
                classes={{
                    root: classes.Card
                }}>
                <CardActionArea
                    onClick={() => {
                        this.selectedExpert = expert
                        this.setState({ showModalExpert: true, showModalCalender: false })
                    }}
                >
                    <CardHeader
                        classes={{
                            root: classes.CardHeader
                        }}
                        avatar={
                            <Avatar src={src}
                                classes={{
                                    root: classes.Avatar
                                }}
                            >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                        }
                        title={
                            <div>
                                <span style={{ marginRight: '10px' }}><b>{expert.userName}</b></span>
                                <FaCheckCircle
                                    className={classes.userVerified}
                                />
                            </div>
                        }
                    >
                    </CardHeader>
                    <CardContent>
                        <List dense={true}>
                            <ListItem key='rating'>
                                <Rating
                                    initialRating={expert.rating}
                                    readonly
                                    emptySymbol={<img src={starEmpty} className={classes.icon} />}
                                    fullSymbol={<img src={starFull} className={classes.icon} />}
                                    style={{display: 'flex', flexDirection: 'row'}}/>
                            </ListItem>
                            <ListItem key='price'>
                                <ListItemIcon>
                                    <FaDollarSign />
                                </ListItemIcon>
                                <ListItemText primary={'$' + expert.price + ' per hour'} />
                            </ListItem>
                            <ListItem key='university'>
                                <ListItemIcon>
                                    <FaUniversity />
                                </ListItemIcon>
                                <ListItemText primary={expert.homeTown} />
                            </ListItem>
                            {/* <ListItem>
                                <ListItemIcon>
                                    <FaMapMarkerAlt />
                                </ListItemIcon>
                                <ListItemText primary={''} />
                            </ListItem> */}
                            <ListItem key='year'>
                                <ListItemIcon>
                                    <img src={group_124} />
                                </ListItemIcon>
                                <ListItemText primary={expert.yearsInField+' years (' + expert.typeExpert + ')'} />
                            </ListItem>
                        </List>
                    </CardContent>
                </CardActionArea>
            </Card>

        )
    }

    buildModalExpert(expert) {
        if (expert == null) {
            return null
        }
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null
        return (
            <Modal
                show={this.state.showModalExpert}
                onHide={() => {
                    this.setState({ showModalExpert: false, showModalExpertMore: false })
                }}
            >
                <Modal.Header
                    className={classes.ModalHeader}
                >
                    <Avatar src={src}
                        classes={{
                            root: classes.Avatar
                        }}
                    >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                    <Modal.Title>
                        <span style={{ marginRight: '10px', fontSize: '15px' }}>{expert.userName}</span>
                        <FaCheckCircle
                            className={classes.userVerified}
                        />
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <List dense={true}
                        subheader={<ListSubheader component="div">Details</ListSubheader>}
                    >
                        <ListItem key='rating'>
                            <Rating
                                initialRating={expert.rating}
                                readonly
                                emptySymbol={<img src={starEmpty} className={classes.icon} />}
                                fullSymbol={<img src={starFull} className={classes.icon} />}
                                style={{display: 'flex', flexDirection: 'row'}}/>
                        </ListItem>
                        <ListItem key='price'>
                            <ListItemIcon>
                                <FaDollarSign />
                            </ListItemIcon>
                            <ListItemText primary={'$' + expert.price + ' per hour'} />
                        </ListItem>
                        <ListItem key='university'>
                                <ListItemIcon>
                                    <FaUniversity />
                                </ListItemIcon>
                                <ListItemText primary={expert.homeTown} />
                            </ListItem>
                        {/* <ListItem key='university'>
                            <ListItemIcon>
                                <FaUniversity />
                            </ListItemIcon>
                            <ListItemText primary={'Stanford University'} />
                        </ListItem> */}
                        {/* <ListItem>
                            <ListItemIcon>
                                <FaMapMarkerAlt />
                            </ListItemIcon>
                            <ListItemText primary={''} />
                        </ListItem> */}
                        <ListItem key='year'>
                            <ListItemIcon>
                                <img src={group_124} />
                            </ListItemIcon>
                            <ListItemText primary={expert.yearsInField+' years (' + expert.typeExpert + ")"} />
                        </ListItem>
                        <ListItem key='more'>
                        {
                            expert.pic && expert.pic.length > 0 ?
                            this.state.showModalExpertMore?
                            <div className={classes.pic}>
                                <IconButton
                                    key="left"
                                    aria-label="left"
                                    color='primary'
                                    disabled={this.state.pIndex<=0}
                                    onClick={()=>{
                                        const pIndex = this.state.pIndex-1
                                        this.setState({pIndex})
                                    }}
                                >
                                    <ChevronLeft />
                                </IconButton>
                                {
                                    expert.pic[this.state.pIndex].pictureDataURL &&
                                    <Avatar
                                        classes={{ root: classes.AvatarBig }}
                                        alt={`Avatar`}
                                        src={expert.pic[this.state.pIndex].pictureDataURL}
                                    />
                                }
                                {
                                    expert.pic[this.state.pIndex].description &&
                                    <TextField
                                        // disabled
                                        label="Read Only"
                                        multiline
                                        fullWidth
                                        rowsMax={5}
                                        value={expert.pic[this.state.pIndex].description}
                                        />

                                }
                                <IconButton
                                    key="right"
                                    aria-label="right"
                                    color='primary'
                                    onClick={()=>{
                                        const pIndex = this.state.pIndex+1
                                        this.setState({pIndex})
                                    }}
                                    disabled={(this.state.pIndex+1)>=expert.pic.length}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </div>
                            :
                                <Link component="button"
                                    onClick={()=>{
                                        this.setState({showModalExpertMore: true})
                                    }}
                                >
                                {'more..'}
                                </Link>
                            :
                            null
                        }
                        </ListItem>
                    </List>
                    {/* <Divider />
                    <List dense={true}
                        subheader={<ListSubheader component="div">What people think</ListSubheader>}
                    >
                    </List> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="primary" classes={{
                        root: classes.button
                    }}
                        onClick={() => {
                            this.props.history.push({
                                pathname: '/chat',
                                state: {
                                    userID: expert.uid, profilePicture: expert.profilePicture, userName: expert.userName
                                }
                            })
                        }}

                    >
                        Message</Button>
                    <Button variant="contained" color="primary" classes={{
                        root: classes.button
                    }}
                        onClick={() => {
                            this.onChangeDate(this.state.seletedDate)
                        }}

                    >
                        Make Appointment ></Button>
                </Modal.Footer>
            </Modal>
        )
    }

    buildModalCanlender(expert) {
        if (expert == null) {
            return null
        }
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null
        var disableBtn = true
        this.state.timeSlots.map(timeSlot=>{
            if (timeSlot.selected) {
                disableBtn = false
            }
        })
        return (
            <Modal
                show={this.state.showModalCalender}
                onHide={() => {
                    this.setState({ showModalCalender: false })
                }}
            >
                <Modal.Header
                    className={classes.ModalHeader}
                >
                    <Avatar src={src}
                        classes={{
                            root: classes.Avatar
                        }}
                    >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                    <Modal.Title>
                        <span style={{ marginRight: '10px', fontSize: '15px' }}>{expert.userName}</span>
                        <FaCheckCircle
                            className={classes.userVerified}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Select day and time for appointment</b></p>
                    <Calendar
                        minDate={new Date()}
                        className={classes.Calendar}
                        onChange={this.onChangeDate.bind(this)}
                        value={this.state.seletedDate}
                    />
                    <List className={classes.timeSlot}>
                        {
                            this.state.timeSlots.map(timeSlot => {
                                return (
                                    <ListItem key={timeSlot.timeSlot}
                                    classes={{
                                        selected: classes.timeSlotSelected
                                    }}
                                        dense button divider selected={timeSlot.selected}
                                        onClick={() => {
                                            timeSlot.selected = !timeSlot.selected
                                            this.setState({ timeSlot: this.state.timeSlots })
                                        }}>

                                        <ListItemText primary={timeSlot.timeSlot} classes={timeSlot.selected ? {
                                            primary: classes.ListItemTextSelected
                                        } : null} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="primary"
                        disabled={disableBtn}
                        onClick={() => {
                            var selected = false
                            this.state.timeSlots.map(timeSlot => {
                                if (timeSlot.selected) {
                                    selected = true
                                }
                            })
                            if (selected) {
                                this.setState({ showModalCalender: false, showModalConfirm: true, appointmentGoal: '' })
                            }
                        }}
                        classes={{
                            root: classes.button
                        }}>Next ></Button>
                </Modal.Footer>
            </Modal>
        )
    }

    goalToTooltiptarget = target => this.goal_tooltip = target

    buildModalConfirm(expert) {
        if (expert == null) {
            return null
        }
        var chargeTime = 0
        this.state.timeSlots.map(timeSlot => {
            if (timeSlot.selected) {
                chargeTime++
            }
        })
        const price = Math.round(expert.price * chargeTime / 2 * 100) / 100
        const fee = Math.round(price * 5) / 100
        this.totalPrice = price + fee
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null
        return (
            <Modal
                show={this.state.showModalConfirm}
                onHide={() => {
                    this.setState({ showModalConfirm: false, showTooltip: false })
                }}
            >
                <Modal.Header
                    className={classes.ModalHeader}
                >
                    <Avatar src={src}
                        classes={{
                            root: classes.Avatar
                        }}
                    >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                    <Modal.Title>
                        <span style={{ marginRight: '10px', fontSize: '15px' }}>{expert.userName}</span>
                        <FaCheckCircle
                            className={classes.userVerified}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <List dense={true}
                        classes={{
                            root: classes.confirmList
                        }}
                        subheader={<ListSubheader component="div">Timeslot(s)</ListSubheader>}
                    >
                        {
                            this.state.timeSlots.map(timeSlot => {
                                if (!timeSlot.selected) {
                                    return null
                                }
                                return (
                                    <ListItem key={timeSlot.timeSlot}>
                                        <ListItemText primary={timeSlot.timeSlot} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <List dense={true}
                        classes={{
                            root: classes.confirmList
                        }}
                        subheader={<ListSubheader component="div">Price</ListSubheader>}
                    >
                        <ListItem key='hourprice' classes={{ root: classes.priceItem }}>
                            <span>price per 1hour:</span>
                            <span><b>{'$' + expert.price}</b></span>
                        </ListItem>
                        <ListItem key='price' classes={{ root: classes.priceItem }}>
                            <span>price:</span>
                            <span><b>{'$' + price}</b></span>
                        </ListItem>
                        <ListItem key='fee' classes={{ root: classes.priceItem }}>
                            <span>fee:</span>
                            <span><b>{'$' + fee}</b></span>
                        </ListItem>
                        <ListItem key='totalprice' classes={{ root: classes.priceItem }}>
                            <span>total price:</span>
                            <span><b>{'$' + this.totalPrice}</b></span>
                        </ListItem>
                    </List>
                    <Divider />
                    <TextField
                        id="standard-with-placeholder"
                        placeholder="Goal of appointment(ex: Essay Editing)"
                        className={classes.textField}
                        margin="normal"
                        ref={this.goalToTooltiptarget}
                        onChange={e => this.setState({ appointmentGoal: e.target.value })}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            this.setState({ showModalCalender: true, showModalConfirm: false, showTooltip: false })
                        }}
                        variant="contained" color="primary" classes={{
                            root: classes.button
                        }}>Back</Button>
                    <Button variant="contained" color="primary"
                        classes={{
                            root: classes.button
                        }}
                        onClick={this.checkout.bind(this)}
                    >

                        CheckOut ></Button>
                </Modal.Footer>
            </Modal>
        )
    }

    //availabilities
    async doPayment(token) {
        try {
            const amount = this.totalPrice
            const tokenid = token.id
            // this.setState({progressVisible: true})
            const res = await fetch(ServerAddress + chargeUrl, {
                method: 'POST',
                body: JSON.stringify({
                    amount, tokenid,
                    dateString: this.dateString,
                    expertID: this.selectedExpert.uid,
                    uid: this.props.auth.uid
                }),
            })
            const resJson = await res.json();
            if (resJson.statusCode == 200) {
                // callback(resJson.body.charge.id);
                // this.setState({progressVisible: false})
                this.state.timeSlots.forEach((element) => {
                    if (element.selected) {
                        var startTime = dataTimes[element.timeSlot].startTime;
                        var endTime = dataTimes[element.timeSlot].endTime;
                        startTime = JSON.stringify(this.dateString) + " " + startTime;
                        endTime = JSON.stringify(this.dateString) + " " + endTime;
                        startTime = moment(startTime, 'YYYY-MM-DD, HH:mm A').format('YYYY-MM-DD HH:mm:ss A');
                        endTime = moment(endTime, 'YYYY-MM-DD, HH:mm A').format('YYYY-MM-DD HH:mm:ss A');
                        var pushRef = firebase.database().ref('appointments').push();
                        var key = pushRef.key;
                        var price = this.hourlyPrice ? (this.hourlyPrice*0.5).toFixed(2) : 140 * 0.5;
                        firebase.database().ref('appointments').child(key).update({
                            chargeID: resJson.body.charge.id,
                            appointmentId: key,
                            learningID: firebase.auth().currentUser.uid,
                            expertID: this.selectedExpert.uid,
                            startTime: startTime,
                            endTime: endTime,
                            price: price,
                            goal: this.state.appointmentGoal,
                            isPaid: false,
                            isRequested: false,
                            learningID_startTime: firebase.auth().currentUser.uid+startTime,
                            expertID_startTime: this.selectedExpert.uid+startTime,
                        })
                        var ref = firebase.database().ref('experts').child(this.selectedExpert.uid).child("availabilities").child(this.dateString);
                        firebase.database().ref('experts').child(this.selectedExpert.uid).child("availabilities").child(this.dateString)
                        .once("value", (snapshot) => {
                            snapshot.forEach((item) => {
                                if (item.val().timeSlot == element.timeSlot) {
                                    ref.child(item.key).remove();
                                }
                            })
                        })
                    }
                })
                this.setState({ showModalCheckout: false, showModalResult: true, checkoutResult: true, checkoutMsg: 'You have successfully created an appointment.' })
                return;
            }
            // this.setState({progressVisible: false})
            this.setState({ showModalCheckout: false, showModalResult: true, checkoutResult: false, checkoutMsg: resJson.body.error })
            return;
        } catch (error) {
            // this.setState({progressVisible: false})
            this.setState({ showModalCheckout: false, showModalResult: true, checkoutResult: false, checkoutMsg: error.message })
            return;
        }
    }

    buildModalCheckout(expert) {
        if (expert == null) {
            return null
        }
        const InjectCheckoutForm = injectStripe(withStyles(styles)(CheckoutForm))
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null
        return (
            <Modal
                show={this.state.showModalCheckout}
                onHide={() => {
                    this.setState({ showModalCheckout: false })
                }}
            >
                <Modal.Header
                    className={classes.ModalHeader}
                >
                    <Avatar src={src}
                        classes={{
                            root: classes.Avatar
                        }}
                    >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                    <Modal.Title>
                        <span style={{ marginRight: '10px', fontSize: '15px' }}>{expert.userName}</span>
                        <FaCheckCircle
                            className={classes.userVerified}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StripeProvider apiKey={apiKey}>
                        <Elements>
                            <InjectCheckoutForm
                                finishCheckout={token => {
                                    if (token) {
                                        this.doPayment(token)
                                    } else {
                                        //this.setState({showTooltip: true, tooltipMsg: 'Invalid Card', tooltipTarget: this.checkout_tooltip})
                                    }
                                }}
                            />
                        </Elements>
                    </StripeProvider>
                </Modal.Body>
            </Modal>
        )
    }

    buildModalResult(expert) {
        if (expert == null) {
            return null
        }
        const { classes } = this.props;
        const src = (expert.profilePicture) ? expert.profilePicture : null
        return (
            <Modal
                show={this.state.showModalResult}
                onHide={() => {
                    this.setState({ showModalResult: false })
                }}
            >
                <Modal.Header
                    className={classes.ModalHeader}
                >
                    <Avatar src={src}
                        classes={{
                            root: classes.Avatar
                        }}
                    >{src ? '' : expert.userName.substring(0, 1)}</Avatar>
                    <Modal.Title>
                        <span style={{ marginRight: '10px', fontSize: '15px' }}>{expert.userName}</span>
                        <FaCheckCircle
                            className={classes.userVerified}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.checkoutResult ? <FaMoneyCheck style={{marginRight: 10}}/> : <FaExclamation  style={{marginRight: 10}}/>}
                    {this.state.checkoutMsg}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="primary"
                        classes={{
                            root: classes.button
                        }}
                        onClick={()=>this.setState({ showModalResult: false })}
                    >OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    checkout() {
        if (this.state.appointmentGoal.length == 0) {
            this.setState({ showTooltip: true, tooltipMsg: 'You have to input appointment goal', tooltipTarget: this.goal_tooltip })
            return
        }
        this.setState({ showModalConfirm: false, showModalCheckout: true, showTooltip: false })
    }

    onChangeDate(value) {
        if (this.selectedExpert && value) {
            var month = '' + (value.getMonth() + 1)
            if (month.length < 2) {
                month = '0' + month
            }
            var day = '' + value.getDate()
            if (day.length < 2) {
                day = '0' + day
            }
            
            this.dateString = value.getFullYear() + '-' + month + '-' + day
            firebase.database().ref('experts/' + this.selectedExpert.uid + '/availabilities/' + this.dateString).once('value', snapshot => {
                const data = snapshot.val()
                // console.log("data", data)
                const timeSlots = []
                for (const key in data) {
                    var timeSlot = data[key]
                    var start = new timezoneJS.Date(`${this.dateString} ${timeSlot.start}:00 ${timeSlot.format}`, `${timeSlot.time_zone}`);
                    var end = new timezoneJS.Date(`${this.dateString} ${timeSlot.end}:00 ${timeSlot.format}`, `${timeSlot.time_zone}`);
                    start.setTimezone(userData['time_zone']['name'])
                    end.setTimezone(userData['time_zone']['name'])
                    timeSlots.push({ timeSlot: start.toTimeString().slice(0,-2)+" - "+end.toTimeString(), selected: false, start: start, end: end })
                }
                this.setState({ showModalExpert: false, showModalExpertMore: false, showModalCalender: true, timeSlots: timeSlots })
            })
        }
    }

    handlePriceChange = (event, value) => {
        this.setState({ selectedPrice: value })
        this.refresh()
    }

    // filterPrice(value, selectedSmaller) {
    //     if (value) {
    //         this.setState({selectedPrice: value, selectedSmaller: selectedSmaller})
    //     } else {
    //         this.setState({selectedPrice: null})
    //     }
    //     this.refresh()
    //     return
    // }

    filterName(e) {
        const value = e.target.value.toLowerCase().trim();
        if (value) {
            this.setState({selectedName: value})
        } else {
            this.setState({selectedName: ''})
        }
        this.refresh()
    }

    filterYears(years) {
        this.setState({selectedYear: years})
        this.refresh()
    }

    filterSpecialties(specialties) {
        this.setState({selectedSpecialties: specialties})
        this.refresh()
    }

    filterPreferences(preferences) {
        this.setState({selectedPreferences: preferences})
        this.refresh()
    }

    filterCategory(category) {
        this.setState({selectedCategory: category})
        this.refresh()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className='root'>
                <AppBar position="static"
                    classes={{
                        root: classes.AppBar
                    }}
                >
                    <Toolbar>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.selectedName}
                                onChange={this.filterName.bind(this)}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
                <Divider />
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}
                        classes={{
                            item: classes.GridItem
                        }}
                    >
                        <ButtonToolbar>
                            <span style={{lineHeight: '50px', fontWeight: 'bold'}}>
                                Filters:
                            </span>
                            <div className={classes.Slider}
                            >
                            <Slider

                                min={5}
                                max={250}
                                step={1}
                                value={this.state.selectedPrice}
                                aria-labelledby="label"
                                onChange={this.handlePriceChange}
                            />
                            <span className='highlight'>Max ${this.state.selectedPrice}/h</span>
                            </div>    
                            {/* <FilterButton selected={this.state.selectedPrice?(this.state.selectedSmaller?'< ':'> ')+'$'+this.state.selectedPrice+'/hour':null} callback={this.filterPrice.bind(this)} default='Any Price'>
                                <Dropdown.Divider />
                                <Dropdown.Item as='button'
                                onClick={()=>{
                                    this.filterPrice(null, null)
                                }}
                                > Any Price</Dropdown.Item>
                            </FilterButton> */}
                            {/* <FilterButton id="dropdown-item-button" title="Time">
                            </FilterButton> */}
                            <FilterButton selected={this.state.selectedYear?this.state.selectedYear+' Years':null} default='Any Years'>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterYears('0-1')
                                    }}
                                >0-1 Year</Dropdown.Item>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterYears('2-3')
                                    }}
                                >2-3 Years</Dropdown.Item>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterYears('4-5')
                                    }}
                                >4-5 Years</Dropdown.Item>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterYears('> 5')
                                    }}
                                >> 5 Years</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterYears(null)
                                    }}
                                >Any Years</Dropdown.Item>
                            </FilterButton>
                            <FilterButton selected={this.state.selectedSpecialties} default='Any Specialties'>
                                {
                                    specialties.map(specialty=>{
                                        return (
                                            <Dropdown.Item as='button'
                                                key={specialty.value}
                                                onClick={()=>{
                                                    this.filterSpecialties(specialty.value)
                                                }}
                                            >
                                            {specialty.label}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                <Dropdown.Divider />
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterSpecialties(null)
                                    }}
                                >
                                    Any Specialties
                                </Dropdown.Item>
                            </FilterButton>
                            
                            {/* <FilterButton selected={this.state.selectedPreferences} default='Any Preferences'>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterPreferences('Just Hourly or Less')
                                    }}
                                >Just Hourly or Less</Dropdown.Item>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterPreferences('Just Packages (10+ hours)')
                                    }}
                                >Just Packages (10+ hours)</Dropdown.Item>
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterPreferences('Both Hourly and Package')
                                    }}
                                >Both Hourly and Package</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as='button'
                                    onClick={()=>{
                                        this.filterPreferences(null)
                                    }}
                                >Any Preferences</Dropdown.Item>
                            </FilterButton> */}
                            {/* <FilterButton selected={this.state.selectedCategory} default='Any Type'>
                            <DropdownButton
                            size="lg"
                            className='topicDropdown'
                            title={this.state.questionTopic?this.state.questionTopic:'All Topics'}
                            >
                        <Dropdown.Item className={classes.DropdownItem} eventKey="All topics" onClick={()=>{this.setState({questionTopic: ''})}}>All topics</Dropdown.Item>
                            {
                                topics.map(topic=><Dropdown.Item className={classes.DropdownItem} key={topic} eventKey={topic} onClick={()=>{this.setState({questionTopic: topic})}}>{topic}</Dropdown.Item>)
                            }
                        </DropdownButton>
                            </FilterButton> */}
                            {/* <div>
                                <DateFormatInput name='date-input'/>
                                <TimeFormatInput name='time-input' />
                            </div> */}
                        </ButtonToolbar>                  
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <p>
                            Your Search Result
                        </p>
                        {
                            this.state.expertData.length > 0 ?
                            <GridList cols={4}
                                cellHeight='auto'
                            >
                                {
                                    this.state.expertData.map(expert => {
                                        return this.buildGridItemExpert(expert)
                                    })
                                }
                            </GridList>
                            :
                            <p className={classes.italic}>There are no experts showing.</p>
                        }
                    </Grid>
                </Grid>
                <Overlay target={this.state.tooltipTarget} show={this.state.showTooltip} placement='top'>
                    {props => (
                        <Popover {...props} className='tooltip' title='warning'>
                            {this.state.tooltipMsg}
                        </Popover>
                    )}
                </Overlay>
                {this.buildModalExpert(this.selectedExpert)}
                {this.buildModalCanlender(this.selectedExpert)}
                {this.buildModalConfirm(this.selectedExpert)}
                {this.buildModalCheckout(this.selectedExpert)}
                {this.buildModalResult(this.selectedExpert)}
            </div>
        )
    }
}

Consultant.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth, profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Consultant));