import React from "react"
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { GiftedChat } from 'react-web-gifted-chat'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { Learning_avatar, Expert_avatar } from '../../const'
import { createBrowserHistory } from "history"

const styles = theme => ({
    root: {
        width: '100%',
        height: "90vh"
    },
    AppBar: {
        backgroundColor: 'white',
        color: 'grey',
        boxShadow: 'none'
    },
    Avatar: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    }
})

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.node.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    window: PropTypes.func,
  };

class Chat extends React.Component {
    constructor(props) {
        super(props)
        const conversation = this.props.location.state
        this.sender = {
            id: this.props.auth.uid,
            avatar: (this.props.profilePicture)?this.props.profilePicture:Learning_avatar
        }
        this.receiver = {
            id: conversation.userID,
            avatar: conversation.profilePicture?conversation.profilePicture:Expert_avatar
        }
        this.state = {
            messages: []
        }
        this.messageRef = null
    }

    componentWillMount() {
        const conversation = this.props.location.state
        const user2ID = conversation.userID
        this.senderConversationRef = firebase.database().ref('conversation/'+this.props.auth.uid+'/'+user2ID)
        this.receiverConversationRef = firebase.database().ref('conversation/'+user2ID+'/'+this.props.auth.uid)
        this.senderConversationRef.once('value', snapshot=>{
            if (snapshot != null && snapshot.val() != null) {
                this.conversationID = snapshot.val().conversationID
            } else {
                this.conversationID = new Date().getTime()
                this.senderConversationRef.set({
                    conversationID: this.conversationID,
                    // unreads: 0
                })
                this.receiverConversationRef.set({
                    conversationID: this.conversationID,
                    // unreads: 0
                })
                firebase.database().ref('message/'+this.conversationID+'/user').set({
                    'user1': this.props.auth.uid,
                    'user2': user2ID
                })
            }

            firebase.database().ref('message/'+this.conversationID+'/msg').orderByChild(this.sender.id+'_state').equalTo('read').limitToLast(100).once('value', snapshot=>{
                const msgs = snapshot.val()
                if (msgs != null) {
                    const messages = []
                    for (const key in msgs) {
                        const msg = msgs[key]
                        const message = {
                            id: msg._id,
                            text: msg.text,
                            createdAt: msg.createdAt,
                        }
                        message.key = key
                        if (msg.user._id == this.sender.id) {
                            message.user = this.sender
                        } else {
                            message.user = this.receiver
                        }
                        messages.push(message)
                    }
                    messages.sort((a,b)=>{
                        if (a.key < b.key) {
                            return 1
                        }
                        return -1
                    })
                    this.setState(previousState => {
                        return {messages: GiftedChat.append(previousState.messages, messages)}
                    })
                }
                this.messageRef = firebase.database().ref('message/'+this.conversationID+'/msg')
                // this.senderConversationRef.update({unreads: 0})
                this.messageRef.orderByChild(this.sender.id+'_state').equalTo('unread').limitToLast(100).on('child_added', this.messageListener)
            })
        })
    }

    componentWillUnmount() {
        if (this.messageRef != null) {
            this.messageRef.off('child_added', this.messageListener)
        }
    }
    assign_textinput = target => this.textinput = target
    messageListener = (snapshot=>{
        const msg = snapshot.val()
        if (msg) {
            const updaes = {}
            updaes[this.sender.id+'_state'] = 'read'
            firebase.database().ref('message/'+this.conversationID+'/msg/'+snapshot.key).update(updaes)
            const message = {
                id: msg._id,
                text: msg.text,
                createdAt: msg.createdAt,
            }
            if (msg.user._id == this.sender.id) {
                message.user = this.sender
            } else {
                message.user = this.receiver
            }
            message.createdAt = new Date().toISOString()
            this.setState(previousState => {
                return {messages: GiftedChat.append(previousState.messages, [message])}
            })
        }
    })

    onSend(messages = []) {
        const msgRef = firebase.database().ref('message/'+this.conversationID+'/msg')
        messages.forEach(message=>{
            // this.receiverConversationRef.once('value', snapshot=>{
            //     if (snapshot != null && snapshot.val() != null) {
            //         const unreads = snapshot.val().unreads+1
            //         this.receiverConversationRef.update({unreads: unreads})
            //     }
            // })
            message[this.sender.id+'_state'] = 'unread'
            message[this.receiver.id+'_state'] = 'unread'
            message._id = message.id
            message.user._id = message.user.id
            msgRef.child(new Date().getTime()).update(message)
        })
    }
    render() {
        const conversation = this.props.location.state
        const { classes } = this.props
        return (
            <React.Fragment>
                <CssBaseline />
                <ElevationScroll>
                <AppBar position="static" color="default"
                    classes={{
                        root: classes.AppBar,
                    }}
                >
                    <Toolbar>
                        <IconButton onClick={()=>{
                            this.props.history.goBack()
                        }}>
                            <ArrowBack/>
                        </IconButton>
                        {
                            conversation.profilePicture ?
                            <Avatar
                                classes={{ root: classes.Avatar }}
                                alt={`Avatar`}
                                src={conversation.profilePicture}
                            />
                            :
                            conversation.userName ?
                                <Avatar
                                    classes={{ root: classes.Avatar }}
                                    alt={`Avatar`}
                                >
                                    {conversation.userName.substring(0, 1)}
                                </Avatar>
                                :
                                <Avatar
                                    classes={{ root: classes.Avatar }}
                                />
                        }
                        <Typography variant="subtitle1" className={classes.title}>
                        {conversation.userName} 
                        </Typography>
                    </Toolbar>
                </AppBar>
                </ElevationScroll>
                <Divider/>
                <Container>
                    <div className={classes.root}>
                <GiftedChat 
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.sender}
                    textInputProps={{
                        onKeyPress: (e)=>{
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                // console.log(this.textinput)
                            }
                        },
                        multiline: false,
                        // ref: this.assign_textinput
                    }}
                />
                </div>
                </Container>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        profilePicture: state.profilePicture,
    }
}

Chat.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(Chat));
