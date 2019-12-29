import React from "react"
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Clear from '@material-ui/icons/Clear'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    title: {
        flexGrow: 1
    },
    Card: {
        maxWidth: 800,
        borderColor: theme.palette.primary.main
    },
    AppBar: {
        backgroundColor: 'white',
        color: 'grey',
        boxShadow: 'none'
    },
    answerCard: {
        marginTop: 10
    },
    textField: {
        width: '100%'
    },
    button: {
        margin: 5,
        width: 80
    },
    IconButton: {
        '&:focus': {
            outline: 'none'
        },
    },

})

class Answers extends React.Component {
    state = {
        answers: [],
        addAnswer: false,
        myAnswer: ''
    }
    componentWillMount() {
        const forum = this.props.location.state
        firebase.database().ref('forum/'+forum.key+'/answers').orderByChild('time').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({answers: []})
                for (const key in data) {
                    const answer = data[key]
                    answer.key = key
                    firebase.database().ref('users/'+answer.author).once('value', snapshot=>{
                        const author = snapshot.val()
                        if (author) {
                            answer.userName = (author.portal=='Expert')?author.firstName+' '+author.lastName:author.userName
                            answer.profilePicture = author.profilePicture?author.profilePicture:''
                            const answers = this.state.answers
                            var upVotes = 0
                            var downVotes = 0
                            if (answer.votes != undefined) {
                                answer.myVote = answer.votes[this.props.auth.uid]
                                for (const voteKey in answer.votes) {
                                    if (answer.votes[voteKey] == 'up') {
                                        upVotes++
                                    }
                                    if (answer.votes[voteKey] == 'down') {
                                        downVotes++
                                    }
                                }
                            }
                            answer.upVotes = upVotes
                            answer.downVotes = downVotes 
                            answers.push(answer)
                            this.setState({answers})
                        }
                    })
                }
            }
        })
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(user=>{
            if (user == null) {
                this.componentWillUnmount()
            }
        })
    }

    componentWillUnmount() {
        const forum = this.props.location.state
        firebase.database().ref('forum/'+forum.key+'/answers').off()
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props
        const forum = this.props.location.state
        return (
            <div>
                <AppBar position="static" color="default"
                    classes={{
                        root: classes.AppBar
                    }}
                >
                    <Toolbar>
                        <IconButton
                            onClick={()=>{
                                this.props.history.goBack()
                            }}
                        >
                            <ArrowBack/>
                        </IconButton>
                        <Typography variant="subtitle1" className={classes.title}>
                            Topic: {forum.topic} 
                        </Typography>
                    </Toolbar>

                </AppBar>
                <Card className={classes.Card}>
                    <CardHeader
                        avatar={
                            forum.profilePicture ?
                            <Avatar
                                classes={{ root: classes.Avatar }}
                                alt={`Avatar`}
                                src={forum.profilePicture}
                            />
                            :
                            forum.userName ?
                                <Avatar
                                    classes={{ root: classes.Avatar }}
                                    alt={`Avatar`}
                                >
                                    {forum.userName.substring(0, 1)}
                                </Avatar>
                                :
                                <Avatar
                                    classes={{ root: classes.Avatar }}
                                />
                            }
                        title={forum.userName}
                        subheader={forum.time}
                        action={
                            <IconButton
                                className={classes.IconButton}
                                onClick={()=>this.setState({addAnswer: !this.state.addAnswer})}
                            >
                                {
                                    this.state.addAnswer?<Clear/>:<Add/>
                                }
                                
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {forum.question}
                        </Typography>
                        <Collapse in={this.state.addAnswer} timeout="auto" unmountOnExit>
                            <CardContent>
                                <TextField
                                    id="filled-textarea"
                                    placeholder="Write your answer"
                                    multiline
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.myAnswer}
                                    onChange={event=>{
                                        this.setState({myAnswer: event.target.value})
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={()=>{
                                        firebase.database().ref('forum/'+forum.key+'/answers/').push({
                                            answer: this.state.myAnswer,
                                            author: this.props.auth.uid,
                                            time: new Date().toISOString()
                                        })
                                        this.setState({addAnswer: false, myAnswer: ''})
                                    }}
                                >
                                Add
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={()=>{
                                        this.setState({addAnswer: false})
                                    }}
                                    >
                                Cancel
                                </Button>
                            </CardContent>
                        </Collapse>
                        {
                            this.state.answers.map(answer=>{
                                return (
                                <Card key={answer.key}
                                    classes={{
                                        root: classes.answerCard
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            answer.profilePicture ?
                                            <Avatar
                                                classes={{ root: classes.Avatar }}
                                                alt={`Avatar`}
                                                src={answer.profilePicture}
                                            />
                                            :
                                            answer.userName ?
                                                <Avatar
                                                    classes={{ root: classes.Avatar }}
                                                    alt={`Avatar`}
                                                >
                                                    {answer.userName.substring(0, 1)}
                                                </Avatar>
                                                :
                                                <Avatar
                                                    classes={{ root: classes.Avatar }}
                                                />
                                            }
                                        title={answer.userName}
                                        subheader={answer.time}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {answer.answer}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <IconButton
                                        onClick={()=>{
                                            this.onPressUpvote(answer)
                                        }}
                                    >
                                        <ThumbUp color={answer.myVote=='up'?'primary':'disabled'}/>
                                        {answer.upVotes}
                                    </IconButton>
                                    <IconButton
                                        onClick={()=>{
                                            this.onPressDownvote(answer)
                                        }}
                                    >
                                        <ThumbDown color={answer.myVote=='down'?'primary':'disabled'}/>
                                        {answer.downVotes}
                                    </IconButton>
                                    </CardActions>
                                </Card>
                                )
                            })
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }

    onPressUpvote = (answer) => {
        const forum = this.props.location.state
        if (answer.myVote != 'up') {
            firebase.database().ref('forum/'+forum.key+'/answers/'+answer.key+'/votes/'+this.props.auth.uid).set('up')
        }
    };

    onPressDownvote = (answer) => {
        const forum = this.props.location.state
        if (answer.myVote != 'down') {
            firebase.database().ref('forum/'+forum.key+'/answers/'+answer.key+'/votes/'+this.props.auth.uid).set('down')
        }
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

Answers.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(Answers));
