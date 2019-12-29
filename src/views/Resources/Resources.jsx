import React from "react"
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const styles = theme => ({
    root: {
        width: '80%',
        padding: '5%'
    },
    list: {
        width: '100%',
        display: 'block'
    },
    subRoot: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    button: {
        margin: 5,
        width: 80
    },
    AddButton: {
        // width: 80,
        '&:focus': {
            outline: 'none'
        },
    },
    ExpansionPanelDetails: {
        flexDirection: 'column'
    }

})

class Resources extends React.Component {
    state = {
        expandedResource: null,
        expandedGoalsTimeline: null,
        FreshmanYear: [],
        SophomoreYear: [],
        JuniorYear: [],
        SeniorYear: [],
        addFreshmanYear: false,
        addSophomoreYear: false,
        addJuniorYear: false,
        addSeniorYear: false,
        goal: '',
    }

    componentWillMount() {
        firebase.database().ref('resources/'+this.props.auth.uid+'/FreshmanYear').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({FreshmanYear: data})
            } else {
                this.setState({FreshmanYear: []})
            }
        })
        firebase.database().ref('resources/'+this.props.auth.uid+'/SophomoreYear').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({SophomoreYear: data})
            } else {
                this.setState({SophomoreYear: []})
            }
        })
        firebase.database().ref('resources/'+this.props.auth.uid+'/JuniorYear').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({JuniorYear: data})
            } else {
                this.setState({JuniorYear: []})
            }
        })
        firebase.database().ref('resources/'+this.props.auth.uid+'/SeniorYear').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({SeniorYear: data})
            } else {
                this.setState({SeniorYear: []})
            }
        })
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(user=>{
            if (user == null) {
                this.componentWillUnmount()
            }
        })
    }

    componentWillUnmount() {
        firebase.database().ref('resources/'+this.props.auth.uid).off()
        this.onAuthStateChanged()
    }
    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={this.state.expandedResource === 'Goals Timeline'} onChange={this.handleExpandResourceChange('Goals Timeline')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Goals Timeline</Typography>
                        {/* <Typography className={classes.secondaryHeading}>For your plan</Typography> */}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.subRoot}>
                        <ExpansionPanel expanded={this.state.expandedGoalsTimeline === 'Freshman Year'} onChange={this.handleExpandGoalsTimelineChange('Freshman Year')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Freshman Year</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                <List className={classes.list}>
                                    {this.resourceItem(this.state.FreshmanYear, firebase.database().ref('resources/'+this.props.auth.uid+'/FreshmanYear'))}
                                </List>
                                <Button
                                    className={classes.AddButton}
                                    onClick={()=>{
                                        this.setState({addFreshmanYear: true})
                                    }}>
                                    <Add/>
                                </Button>
                                <Collapse in={this.state.addFreshmanYear} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <TextField
                                            id="filled-textarea"
                                            placeholder="Write yoour goal"
                                            multiline
                                            className={classes.subRoot}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.goal}
                                            onChange={event=>{
                                                this.setState({goal: event.target.value})
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={()=>{
                                                firebase.database().ref('resources/'+this.props.auth.uid+'/FreshmanYear').push(this.state.goal)
                                                this.setState({addFreshmanYear: false, goal: ''})
                                            }}
                                        >
                                        Add
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={()=>{
                                                this.setState({addFreshmanYear: false})
                                            }}
                                            >
                                        Cancel
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expandedGoalsTimeline === 'Sophomore Year'} onChange={this.handleExpandGoalsTimelineChange('Sophomore Year')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Sophomore Year</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                <List component="nav" className={classes.subRoot}>
                                    {this.resourceItem(this.state.SophomoreYear, firebase.database().ref('resources/'+this.props.auth.uid+'/SophomoreYear'))}
                                </List>
                                <Button
                                    className={classes.AddButton}
                                    onClick={()=>{
                                        this.setState({addSophomoreYear: true})
                                    }}>
                                    <Add/>
                                </Button>
                                <Collapse in={this.state.addSophomoreYear} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <TextField
                                            id="filled-textarea"
                                            placeholder="Write yoour goal"
                                            multiline
                                            className={classes.subRoot}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.goal}
                                            onChange={event=>{
                                                this.setState({goal: event.target.value})
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={()=>{
                                                firebase.database().ref('resources/'+this.props.auth.uid+'/SophomoreYear').push(this.state.goal)
                                                this.setState({addSophomoreYear: false, goal: ''})
                                            }}
                                        >
                                        Add
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={()=>{
                                                this.setState({addSophomoreYear: false})
                                            }}
                                            >
                                        Cancel
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expandedGoalsTimeline === 'Junior Year'} onChange={this.handleExpandGoalsTimelineChange('Junior Year')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Junior Year</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                <List component="nav" className={classes.subRoot}>
                                    {this.resourceItem(this.state.JuniorYear, firebase.database().ref('resources/'+this.props.auth.uid+'/JuniorYear'))}
                                </List>
                                <Button
                                    className={classes.AddButton}
                                    onClick={()=>{
                                        this.setState({addJuniorYear: true})
                                    }}>
                                    <Add/>
                                </Button>
                                <Collapse in={this.state.addJuniorYear} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <TextField
                                            id="filled-textarea"
                                            placeholder="Write yoour goal"
                                            multiline
                                            className={classes.subRoot}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.goal}
                                            onChange={event=>{
                                                this.setState({goal: event.target.value})
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={()=>{
                                                firebase.database().ref('resources/'+this.props.auth.uid+'/JuniorYear').push(this.state.goal)
                                                this.setState({addJuniorYear: false, goal: ''})
                                            }}
                                        >
                                        Add
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={()=>{
                                                this.setState({addJuniorYear: false})
                                            }}
                                            >
                                        Cancel
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={this.state.expandedGoalsTimeline === 'Senior Year'} onChange={this.handleExpandGoalsTimelineChange('Senior Year')}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Senior Year</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                                <List component="nav" className={classes.subRoot}>
                                    {this.resourceItem(this.state.SeniorYear, firebase.database().ref('resources/'+this.props.auth.uid+'/SeniorYear'))}
                                </List>
                                <Button
                                    className={classes.AddButton}
                                    onClick={()=>{
                                        this.setState({addSeniorYear: true})
                                    }}>
                                    <Add/>
                                </Button>
                                <Collapse in={this.state.addSeniorYear} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <TextField
                                            id="filled-textarea"
                                            placeholder="Write yoour goal"
                                            multiline
                                            className={classes.subRoot}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.goal}
                                            onChange={event=>{
                                                this.setState({goal: event.target.value})
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick={()=>{
                                                firebase.database().ref('resources/'+this.props.auth.uid+'/SeniorYear').push(this.state.goal)
                                                this.setState({addSeniorYear: false, goal: ''})
                                            }}
                                        >
                                        Add
                                        </Button>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={()=>{
                                                this.setState({addSeniorYear: false})
                                            }}
                                            >
                                        Cancel
                                        </Button>
                                    </CardContent>
                                </Collapse>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expandedResource === 'College Preparation'} onChange={this.handleExpandResourceChange('College Preparation')}>
                    <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>College Preparation</Typography>
                        <Typography className={classes.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List component="nav" className={classes.subRoot}>
                            <ListItem button onClick={()=>window.open('https://uniontestprep.com/act', '_blank').focus()}>
                                <Typography className={classes.heading}>US History</Typography>
                                <Typography className={classes.secondaryHeading}>Category: History</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/SAT', '_blank').focus()}>
                                <Typography className={classes.heading}>World History</Typography>
                                <Typography className={classes.secondaryHeading}>Category: History</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/ACT', '_blank').focus()}>
                                <Typography className={classes.heading}>Chemistry</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Science</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('http://laptopstudy.com/200-most-useful-websites-for-college-students/', '_blank').focus()}>
                                <Typography className={classes.heading}>General Study Resources</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Study</Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expandedResource === 'SAT/ACT'} onChange={this.handleExpandResourceChange('SAT/ACT')}>
                    <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>SAT/ACT</Typography>
                        {/* <Typography className={classes.secondaryHeading}>SAT/ACT Preparation</Typography> */}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List component="nav" className={classes.subRoot}>
                            <ListItem button onClick={()=>window.open('https://www.khanacademy.org/test-prep/sat/full-length-sat-1', '_blank').focus()}>
                                <Typography className={classes.heading}>Khan Academy SAT</Typography>
                                <Typography className={classes.secondaryHeading}>Category: SAT</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://uniontestprep.com/act', '_blank').focus()}>
                                <Typography className={classes.heading}>Union Test Prep ACT</Typography>
                                <Typography className={classes.secondaryHeading}>Category: ACT</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/SAT', '_blank').focus()}>
                                <Typography className={classes.heading}>Reason Prep SAT</Typography>
                                <Typography className={classes.secondaryHeading}>Category: SAT</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/ACT', '_blank').focus()}>
                                <Typography className={classes.heading}>Reason Prep ACT</Typography>
                                <Typography className={classes.secondaryHeading}>Category: ACT</Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expandedResource === 'Study Material'} onChange={this.handleExpandResourceChange('Study Material')}>
                    <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>Study Material</Typography>
                        <Typography className={classes.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <List component="nav" className={classes.subRoot}>
                            <ListItem button onClick={()=>window.open('https://www.khanacademy.org/test-prep/sat/full-length-sat-1', '_blank').focus()}>
                                <Typography className={classes.heading}>Calculus</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Math</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://uniontestprep.com/act', '_blank').focus()}>
                                <Typography className={classes.heading}>US History</Typography>
                                <Typography className={classes.secondaryHeading}>Category: History</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/SAT', '_blank').focus()}>
                                <Typography className={classes.heading}>World History</Typography>
                                <Typography className={classes.secondaryHeading}>Category: History</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/ACT', '_blank').focus()}>
                                <Typography className={classes.heading}>Chemistry</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Science</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://www.khanacademy.org/test-prep/sat/full-length-sat-1', '_blank').focus()}>
                                <Typography className={classes.heading}>Physics</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Science</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('https://www.khanacademy.org/test-prep/sat/full-length-sat-1', '_blank').focus()}>
                                <Typography className={classes.heading}>Biology</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Science</Typography>
                            </ListItem>
                            <ListItem button onClick={()=>window.open('http://laptopstudy.com/200-most-useful-websites-for-college-students/', '_blank').focus()}>
                                <Typography className={classes.heading}>General Study Resources</Typography>
                                <Typography className={classes.secondaryHeading}>Category: Study</Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expandedResource === 'Internships'} onChange={this.handleExpandResourceChange('Internships')}>
                    <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>Internships</Typography>
                        {/* <Typography className={classes.secondaryHeading}>Internships/Contests</Typography> */}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <List component="nav" className={classes.subRoot}>
                        <ListItem button onClick={()=>window.open('http://www.internships.com/high-school', '_blank').focus()}>
                            <Typography className={classes.heading}>High School Internships - Chegg</Typography>
                            <Typography className={classes.secondaryHeading}>Category: Internships</Typography>
                        </ListItem>
                        <ListItem button onClick={()=>window.open('https://www.indeed.com/jobs?q=High+School+Intern&l=', '_blank').focus()}>
                            <Typography className={classes.heading}>High School Internships - Indeed</Typography>
                            <Typography className={classes.secondaryHeading}>Category: ACT</Typography>
                        </ListItem>
                        <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/SAT', '_blank').focus()}>
                            <Typography className={classes.heading}>Reason Prep SAT</Typography>
                            <Typography className={classes.secondaryHeading}>Category: SAT</Typography>
                        </ListItem>
                        <ListItem button onClick={()=>window.open('https://members.reasonprep.com/courses/category/ACT', '_blank').focus()}>
                            <Typography className={classes.heading}>Reason Prep ACT</Typography>
                            <Typography className={classes.secondaryHeading}>Category: ACT</Typography>
                        </ListItem>
                    </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    handleExpandResourceChange = panel => (event, isExpanded) => {
        this.setState({expandedResource: isExpanded?panel:null})
    }

    handleExpandGoalsTimelineChange = panel => (event, isExpanded) => {
        this.setState({expandedGoalsTimeline: isExpanded?panel:null})
    }

    resourceItem(list, ref) {
        return Object.keys(list).map((key, index) => {
            return (
                <ListItem key={key}>
                    <ListItemText
                        primary={list[key]}
                    >
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete" onClick={()=>{
                            ref.child(key).remove()
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        profilePicture: state.profilePicture,
        profile: state.profile
    }
}

Resources.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(Resources));
