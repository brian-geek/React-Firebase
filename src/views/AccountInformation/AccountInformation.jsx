import React from "react"
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles"
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Divider from '@material-ui/core/Divider'
import { Form, DropdownButton, Dropdown } from 'react-bootstrap'
import Toolbar from '@material-ui/core/Toolbar'
import Payment from '@material-ui/icons/Payment'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Collapse from '@material-ui/core/Collapse'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import moment from "moment"
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {clientID, sk_test} from '../../const'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
    root: {
        marginTop: theme.spacing(3),
    },
    Paper: {
        padding: theme.spacing(3, 2),
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
        margin: theme.spacing(1)
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

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    }

    render() {
        const { order, orderBy, classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell key='transaction' sortDirection={orderBy==='transaction'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='transaction'}
                            direction={order}
                            onClick={this.createSortHandler('transaction')}
                        >
                        Transaction
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='amount' sortDirection={orderBy==='amount'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='amount'}
                            direction={order}
                            onClick={this.createSortHandler('amount')}
                        >
                        Amount
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

class AccountInformation extends React.Component {
    state = {
        transactions: [],
        stripe_customer: null,
        openWarning: false,
        order: 'desc',
        orderBy: 'time',
        rowsPerPage: 10,
        page: 0,
    }
    
    componentWillMount() {
        firebase.database().ref('Transaction_history').orderByChild('uid').equalTo(this.props.auth.uid).on('child_added', snapshot=>{
            const data = snapshot.val()
            if (data != null) {
                const transactions = this.state.transactions
                transactions.push(data)
                this.setState({transactions: transactions})
            }
        })
        firebase.database().ref('stripe_customers/'+this.props.auth.uid).on('value', snapshot=>{
            const data = snapshot.val()
            if (data != null) {
                this.setState({stripe_customer: data})
            }
        })
        this.onAuthStateChanged = firebase.auth().onAuthStateChanged(user=>{
            if (user == null) {
                this.componentWillUnmount()
            }
        })
    }

    componentWillUnmount() {
        firebase.database().ref('Transaction_history').off()
        firebase.database().ref('stripe_customers/'+this.props.auth.uid).off()
        this.onAuthStateChanged()
    }

    render() {
        const { classes } = this.props
        const { order, orderBy, rowsPerPage, page, transactions } = this.state
        const ForumTableHead = withStyles(styles)(EnhancedTableHead)
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage)
        return (
            <div className={classes.root}>
                {
                    this.props.auth.portalType == 'Expert' &&
                <Paper className={classes.Paper}>
                    {
                        this.state.stripe_customer &&
                        <div>
                            <Typography variant="h5" component="h5">
                            Your Balance
                            </Typography>
                            <Typography component="p">
                            Available: ${this.state.stripe_customer.available}  Pending: ${this.state.stripe_customer.pending}
                            </Typography>                
                        </div>
                    }
                    <Typography variant="h5" component="h5">
                    Your Stripe Connect
                    </Typography>
                    <Typography component="p">
                        {
                            this.state.stripe_customer?
                            <div>
                                Stripe ID: {this.state.stripe_customer.id}
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    className={classes.IconButton}
                                    onClick={(event)=>{
                                        this.setState({openWarning: true})
                                    }}
                                >
                                    remove
                                    <Close/>
                                </Button>
                            </div>
                            :
                            <Button
                                color='primary'
                                variant='contained'
                                className={classes.IconButton}
                                onClick={(event)=>{
                                    this.addCardInfo()
                                }}
                            >
                                Add
                                <Add/>
                            </Button>
                        }
                    </Typography>                
                </Paper>
                }
                <Divider />
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <ForumTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={transactions.length}
                    />
                    <TableBody>
                    {
                        stableSort(transactions, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(transaction=>{
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={transaction.key}
                                >
                                    <TableCell>
                                        {transaction.transaction}
                                    </TableCell>
                                    <TableCell className={classes.paddingNone}>
                                        {transaction.amount}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {transaction.time}
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
                    count={transactions.length}
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
                <Dialog
                    open={this.state.openWarning}
                    onClose={()=>{
                        this.setState({openWarning: false})
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Request Action"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to remove your connected Stripe account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={async ()=>{
                                var formData = new FormData();
                                formData.append('client_id', clientID);
                                formData.append('stripe_user_id', this.state.stripe_customer.id);
                                const response = await fetch('https://connect.stripe.com/oauth/deauthorize', {
                                    method: 'POST',
                                    body: formData,
                                    headers: {'Authorization': 'Bearer '+sk_test},
                                });
                                const responseJson = await response.json();
                                firebase.database().ref('stripe_customers/'+this.props.auth.uid).remove()
                                this.setState({stripe_customer: null, openWarning: false})
                            }} 
                            color="primary">
                        Yes
                        </Button>
                        <Button
                            onClick={()=>{
                                this.setState({openWarning: false})
                            }}
                            color="primary" autoFocus>
                        No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
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

    addCardInfo = () => {
        window.open('https://connect.stripe.com/express/oauth/authorize?client_id='+clientID+'&state=' + this.props.auth.uid, '_blank').focus()
    }
    removeCarInfo() {

    }
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        profilePicture: state.profilePicture,
        profile: state.profile
    }
}

AccountInformation.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withStyles(styles)(AccountInformation));
