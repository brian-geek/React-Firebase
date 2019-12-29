import React from "react"
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'
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
import './Forums.css'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
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
    }

})

const topics = [
    'Nutrition',
    'Sewing or Knitting',
    'Woodworking or Whittling',
    'Visual Art',
    'Fitness and Health'
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
                    <TableCell key='question' sortDirection={orderBy==='question'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='question'}
                            direction={order}
                            onClick={this.createSortHandler('question')}
                        >
                        Question
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='topic' sortDirection={orderBy==='topic'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='topic'}
                            direction={order}
                            onClick={this.createSortHandler('topic')}
                        >
                        Topic
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='auther' align='left' sortDirection={orderBy==='auther'?order:false} className={classes.paddingNone}
                    >
                        <TableSortLabel
                            active={orderBy==='auther'}
                            direction={order}
                            onClick={this.createSortHandler('auther')}
                        >
                        Author
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='time' align='right' sortDirection={orderBy==='time'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='time'}
                            direction={order}
                            onClick={this.createSortHandler('time')}
                        >
                        Time
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='answer' align='right' sortDirection={orderBy==='answer'?order:false}>
                        <TableSortLabel
                            active={orderBy==='answer'}
                            direction={order}
                            onClick={this.createSortHandler('answer')}>
                        Answers
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='action' align='right' sortDirection={orderBy==='action'?order:false}>
                        <TableSortLabel
                            active={orderBy==='action'}
                            direction={order}
                            onClick={this.createSortHandler('action')}>
                        Action
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

class Forums extends React.Component {
    state = {
        questionTopic: '',
        selectedName: '',
        forumList: [],
        order: 'desc',
        orderBy: 'time',
        rowsPerPage: 10,
        page: 0,
        anchorEl: null,
        addQuestion: false,
        myQueston: '',
        addTopic: ''
    }
    
    componentWillMount() {
        firebase.database().ref('forum').orderByChild('time').on('value', snapshot=>{
            const data = snapshot.val()
            if (data) {
                this.setState({forumList: []})
                for (const key in data) {
                    const forum = data[key]
                    if (forum.approved == 1 || forum.author == this.props.auth.uid) {
                        forum.key = key
                        firebase.database().ref('users/'+forum.author).once('value', snapshot=>{
                            const author = snapshot.val()
                            if (author) {
                                forum.userName = (author.portal=='Expert')?author.firstName+' '+author.lastName:author.userName
                                forum.profilePicture = author.profilePicture?author.profilePicture:''
                                const forumList = this.state.forumList
                                if (forum.answers==undefined) {
                                    forum.answers = []
                                }
                                forumList.push(forum)
                                this.setState({forumList: forumList})
                            }
                        })
                    }
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
        firebase.database().ref('forum').off()
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props
        const { order, orderBy, rowsPerPage, page } = this.state
        const ForumTableHead = withStyles(styles)(EnhancedTableHead)
        const forumList = this.state.forumList.filter(forum=>{
            if (this.state.questionTopic) {
                if (forum.topic != this.state.questionTopic) {
                    return false
                }
            }
            if (this.state.selectedName) {
                if (!forum.question.toLowerCase().includes(this.state.selectedName)) {
                    return false
                }
            }
            return true
        })
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, forumList.length - page * rowsPerPage)
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
                                placeholder="Fiter questions..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={this.state.selectedName}
                                onChange={this.filterName.bind(this)}
                            />

                        </div>
                        <div className={classes.grow}></div>
                        <Button
                            color='primary'
                            variant='outlined'
                            className={classes.IconButton}
                            onClick={(event)=>{
                                this.setState({anchorEl: event.currentTarget})
                            }}
                        >
                            Add Question
                            <Add/>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Divider />
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
                <Collapse in={this.state.addQuestion} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TextField
                            id="filled-textarea"
                            placeholder="Write yoour question"
                            multiline
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.myQueston}
                            onChange={event=>{
                                this.setState({myQueston: event.target.value})
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={()=>{
                                firebase.database().ref('forum').push({
                                    question: this.state.myQueston,
                                    author: this.props.auth.uid,
                                    time: new Date().toISOString(),
                                    topic: this.state.addTopic,
                                    approved: 0
                                })
                                this.setState({addQuestion: false, myQueston: ''})
                            }}
                        >
                        Add
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={()=>{
                                this.setState({addQuestion: false})
                            }}
                            >
                        Cancel
                        </Button>
                    </CardContent>
                </Collapse>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <ForumTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={forumList.length}
                    />
                    <TableBody>
                    {
                        stableSort(forumList, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(forum=>{
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={forum.key}
                                >
                                <TableCell width='30%'>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={()=>{
                                            this.props.history.push({
                                                pathname: '/answers',
                                                state: forum
                                            })
                                        }}
                                    >
                                        {forum.question}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.paddingNone}>
                                    {forum.topic}
                                </TableCell>
                                <TableCell className={classes.paddingNone}
                                    component='th'
                                >
                                    <div className={classes.Consultant}>
                                        {
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
                                        <span className={classes.Name} >{forum.userName}</span>
                                    </div>
                                </TableCell>
                                <TableCell align='right'>
                                    {forum.approved==0?'(waiting for approval)':moment(forum.time).fromNow()}
                                </TableCell>
                                <TableCell align='right'>
                                    {(Object.keys(forum.answers)).length}
                                </TableCell>
                                <TableCell align='right'>
                                    {
                                        forum.author == this.props.auth.uid && 
                                        <Button color='primary'
                                            onClick={()=>{
                                                firebase.database().ref('forum/'+forum.key).remove()
                                            }}
                                        >
                                            Delete Post
                                        </Button>
                                    }
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
                    count={forumList.length}
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
                <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.anchorEl!=null}
                    onClose={()=>{
                        this.setState({anchorEl: null})
                    }}
                >
                    <MenuItem disabled classes={{root: classes.MenuItemTitle}}>Pick a topic</MenuItem>
                    <Divider/>
                    {
                        topics.map(topic=>
                            <MenuItem
                                onClick={()=>{
                                    this.setState({anchorEl: null, addQuestion: true, addTopic: topic})
                                }}
                                key={topic}
                            >
                            {topic}
                            </MenuItem>    
                        )
                    }
                </Menu>
            </div>
        )
    }

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

Forums.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(Forums));
