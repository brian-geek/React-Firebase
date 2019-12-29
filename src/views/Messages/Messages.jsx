import React from "react"
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { fade } from '@material-ui/core/styles/colorManipulator'
import AppBar from '@material-ui/core/AppBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Divider from '@material-ui/core/Divider'
import { Form, DropdownButton, Dropdown } from 'react-bootstrap'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from "moment"
import Badge from '@material-ui/core/Badge'
import { Redirect } from "react-router-dom";

const AdapterLink = React.forwardRef((props, ref) => {
    return <RouterLink innerRef={ref} {...props} />
});

const styles = theme => ({
    root: {
        width: '100%',
    },
    AppBar: {
        backgroundColor: 'white',
        color: 'grey',
        boxShadow: 'none'
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
    grow: {
        flexGrow: 1
    },
    IconButton: {
        '&:focus': {
            outline: 'none'
        },
    },
    DropdownItem: {
        // color: theme.palette.primary.main
    },
    Avatar: {
        // float: 'left',
        marginRight: 10,
    },
    Consultant: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
    textField: {
        width: '100%'
    },
    button: {
        margin: 5,
        width: 80
    },
    MenuItemTitle: {
        color: theme.palette.primary.main
    },
    marginZero: {
    },
    handCursor: {
        cursor: 'pointer'
    }

})

const topics = [
    'College Life',
    'College Application',
    'Resources'
]

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    }

    render() {
        const { order, orderBy, classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell key='userName' sortDirection={orderBy==='userName'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='userName'}
                            direction={order}
                            onClick={this.createSortHandler('userName')}
                        >
                        Expert
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='lastMessage' sortDirection={orderBy==='lastMessage'?order:false} align='right'>
                        <TableSortLabel
                            active={orderBy==='lastMessage'}
                            direction={order}
                            onClick={this.createSortHandler('lastMessage')}
                        >
                        Last message
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='lastTime' align='right' sortDirection={orderBy==='lastTime'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='lastTime'}
                            direction={order}
                            onClick={this.createSortHandler('lastTime')}
                        >
                        Time
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class Messages extends React.Component {
    state = {
        conversations: [],
        order: 'desc',
        orderBy: 'time',
        rowsPerPage: 10,
        page: 0,
    }

    messageRef = []

    componentWillMount() {
        firebase.database().ref('conversation').orderByKey().equalTo(this.props.auth.uid).on('child_added', this.messageListener)
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(user=>{
            if (user == null) {
                this.componentWillUnmount()
            }
        })

    }

    componentWillUnmount() {
        firebase.database().ref('conversation').off()
        this.messageRef.map(item=>{
            item.off('child_added', this.messageListener)
        })
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props
        const { order, orderBy, rowsPerPage, page } = this.state
        const ForumTableHead = withStyles(styles)(EnhancedTableHead)
        const conversations = this.state.conversations.filter(conversation=>{
            if (this.state.selectedName) {
                if (!conversation.userName.toLowerCase().includes(this.state.selectedName)) {
                    return false
                }
            }
            return true
        })
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, conversations.length - page * rowsPerPage)
        return (
            <div className={classes.root}>
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
                        <div className={classes.grow}></div>
                    </Toolbar>
                </AppBar>
                <Divider />
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <ForumTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={conversations.length}
                    />
                    <TableBody>
                    {
                        stableSort(conversations, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(conversation=>{
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={conversation.conversationID}
                                    className={classes.handCursor}
                                    onClick={()=>{
                                        this.props.history.push({
                                            pathname: '/chat',
                                            state: {
                                                userID: conversation.userID, profilePicture: conversation.profilePicture, userName: conversation.userName
                                            }
                                        })
                                    }}
                                >
                                <TableCell className={classes.paddingNone}
                                    component='th'
                                >
                                    <div className={classes.Consultant}>
                                        {
                                            conversation.profilePicture ?
                                                <Badge className={classes.marginZero} color="secondary" badgeContent={conversation.unreads}>
                                                <Avatar
                                                    classes={{ root: classes.Avatar }}
                                                    alt={`Avatar`}
                                                    src={conversation.profilePicture}
                                                />
                                                </Badge>
                                                :
                                                conversation.userName ?
                                                <Badge className={classes.marginZero} color="secondary" badgeContent={conversation.unreads}>
                                                    <Avatar
                                                        classes={{ root: classes.Avatar }}
                                                        alt={`Avatar`}
                                                    >
                                                        {conversation.userName.substring(0, 1)}
                                                    </Avatar>
                                                </Badge>
                                                    :
                                                    <Badge className={classes.marginZero} color="secondary" badgeContent={conversation.unreads}>
                                                    <Avatar
                                                        classes={{ root: classes.Avatar }}
                                                    />
                                                    </Badge>
                                        }
                                        <span className={classes.Name} >{conversation.userName}</span>
                                    </div>
                                </TableCell>
                                <TableCell align='right'>
                                    {conversation.lastMessage}
                                </TableCell>
                                <TableCell align='right'>
                                    {moment(parseInt(conversation.lastTime)).fromNow()}
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                    {
                        emptyRows > 0 &&
                        <TableRow>
                            <TableCell colSpan={6} />
                        </TableRow>
                    }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={conversations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }

    messageListener = (snapshot=>{
        const conv_data = snapshot.val()
        if (conv_data != null) {
            for (const key in conv_data) {
                const userID = key
                const data = conv_data[key]
                const conversationID = data.conversationID
                firebase.database().ref('users/' + userID).once('value').then(snapshot => {
                    const data = snapshot.val()
                    if (data != null) {
                        const profilePicture = (data.profilePicture) ? data.profilePicture : ''
                        const userName = data.portal == 'Expert'?data.firstName + ' ' + data.lastName:data.userName
                        const skypeName = (snapshot.val().skypeUserName)?data.skypeUserName:''
                        const messageRef = firebase.database().ref('message/' + conversationID + '/msg')
                        messageRef.orderByKey().limitToLast(1).on('child_added', snapshot => {
                            const data = snapshot.val()
                            if (data != null) {
                                const lastTime = snapshot.key
                                const lastMessage = data.text
                                messageRef.orderByChild(this.props.auth.uid+'_state').equalTo('unread').once('value', snapshot=>{
                                    const unreadData = snapshot.val()
                                    var unreads = 0
                                    if (unreadData != null) {
                                        for (const key in unreadData) {
                                            unreads++
                                        }
                                    }
                                    var bExist = false
                                    const conversations = this.state.conversations.map(conversation => {
                                        if (conversation.conversationID == conversationID) {
                                            bExist = true
                                            conversation.lastMessage = lastMessage
                                            conversation.lastTime = lastTime
                                            conversation.unreads = unreads
                                        }
                                        return conversation;
                                    })
                                    if (!bExist) {
                                        conversations.push({
                                            conversationID,
                                            userName,
                                            userID,
                                            profilePicture,
                                            lastMessage: lastMessage,
                                            unreads: unreads,
                                            lastTime: lastTime,
                                            skypeName
                                        })
                                    }
                                    this.setState({ conversations })
                                })
                            }
                        })
                        messageRef.on('child_changed', snapshot => {
                            const data = snapshot.val()
                            if (data != null) {
                                const lastTime = snapshot.key
                                const lastMessage = data.text
                                messageRef.orderByChild(this.props.auth.uid+'_state').equalTo('unread').once('value', snapshot=>{
                                    const unreadData = snapshot.val()
                                    var unreads = 0
                                    if (unreadData != null) {
                                        for (const key in unreadData) {
                                            unreads++
                                        }
                                    }
                                    const conversations = this.state.conversations.map(conversation => {
                                        if (conversation.conversationID == conversationID) {
                                            conversation.lastMessage = lastMessage
                                            conversation.lastTime = lastTime
                                            conversation.unreads = unreads
                                        }
                                        return conversation
                                    })
                                    this.setState({ conversations: conversations })
                                })
                            }
                        })
                        this.messageRef.push(messageRef)
                    }
                })
            }
        }
    })
    filterName(e) {
        const value = e.target.value.toLowerCase().trim();
        if (value) {
            this.setState({selectedName: value})
        } else {
            this.setState({selectedName: ''})
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy })
    }

    handleChangePage = (event, page) => {
        this.setState({ page })
    }
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        profilePicture: state.profilePicture,
        profile: state.profile
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(Messages));
