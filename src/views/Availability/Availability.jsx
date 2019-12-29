import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import GridItem from "components/Grid/GridItem.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import Calendar from 'react-calendar'
import {dataTimes} from '../../const'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
var userData;

const styles = theme => ({
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    Calendar: {
        [theme.breakpoints.up('md')]: {
            width: '60%',
            display: 'inline',
            float: 'left',
        }

    },
    timeSlot: {
        [theme.breakpoints.up('md')]: {
            width: '40%',
            float: 'left',
        },
        overflow: 'auto',
        maxHeight: '350px'
    },
    timeSlotSelected: {
        backgroundColor: theme.palette.primary.main + ' !important',
    },
    ListItemTextSelected: {
        color: 'white !important'
    },
})

class Availability extends React.Component {
    state = {
        seletedDate: new Date(),
        timeSlots: []
    }
    dataTimes = Object.keys(dataTimes)
    componentWillMount() {
        fetch('https://api.ipgeolocation.io/ipgeo?apiKey=cb5487441087406ba850ed9bf87f4245')
            .then((res) => res.json())
            .then((result) => {
                userData = result
            })
        this.onChangeDate(this.state.seletedDate)
    }
    render() {
        const {classes} = this.props
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color='primary'>
                                <h4 className={classes.cardTitleWhite}>Set Availability</h4>
                                <p className={classes.cardCategoryWhite}>Clicking a time period saves it as available. Students will be able to book this timeslot for an appointment.</p>
                            </CardHeader>
                            <CardBody>
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
                                                    var t = timeSlot.timeSlot.split(' ')
                                                    if (timeSlot.selected) {
                                                        console.log(this.dateString)
                                                        firebase.database().ref('consultants/'+this.props.auth.uid+'/availabilities/'+this.dateString).push({
                                                            timeSlot: timeSlot.timeSlot,
                                                            start: t[0],
                                                            end: t[2],
                                                            format: t[3],
                                                            time_zone: userData['time_zone']['name']
                                                        }, ()=>{
                                                            this.setState({ timeSlots: this.state.timeSlots })
                                                        });
                                                    } else {
                                                        const ref = firebase.database().ref('consultants/'+this.props.auth.uid+'/availabilities/'+this.dateString)
                                                        ref.orderByChild('timeSlot')
                                                        .equalTo(timeSlot.timeSlot)
                                                        .once('value', snapshot=>{
                                                            const data = snapshot.val()
                                                            if (data != null) {
                                                                for (const key in data) {
                                                                    ref.child(key).remove()
                                                                }
                                                                this.setState({ timeSlots: this.state.timeSlots })
                                                            }
                                                        })
                                                    }
                                                }}>

                                                <ListItemText primary={timeSlot.timeSlot} classes={timeSlot.selected ? {
                                                    primary: classes.ListItemTextSelected
                                                } : null} />
                                            </ListItem>
                                        )
                                    })
                                }
                                </List>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
    onChangeDate(value) {
        if (value) {
            var month = '' + (value.getMonth() + 1)
            if (month.length < 2) {
                month = '0' + month
            }
            var day = '' + value.getDate()
            if (day.length < 2) {
                day = '0' + day
            }
            this.dateString = value.getFullYear() + '-' + month + '-' + day
            firebase.database().ref('consultants/' + this.props.auth.uid + '/availabilities/' + this.dateString).once('value', snapshot => {
                const data = snapshot.val()
                const selectedtimeSlots = []
                for (const key in data) {
                    const timeSlot = data[key]
                    selectedtimeSlots.push(timeSlot.timeSlot)
                }
                this.setState({timeSlots: this.dataTimes.map(times=>{
                    if (selectedtimeSlots.includes(times)) {
                        return {timeSlot: times, selected: true}
                    }
                    return {timeSlot: times, selected: false}
                })})
            })
        }
    }
}

Availability.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth, profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Availability));
