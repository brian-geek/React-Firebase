import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import AppointBlock from './AppointBlock'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Modal } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import moment from 'moment';
import {ServerAddress, transferUrl, refundtUrl } from '../../const'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Rating from 'react-rating'
import starEmpty from '../../assets/img/star-empty.png'
import starFull from '../../assets/img/star-full.png'

const styles = theme => ({
    ModalHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    Button: {
        height: 35,
        borderRadius: 20,
        margin: 10,
        '&:focus': {
            outline: 'none'
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    icon: {
        width: '30px',
        height: '30px'
    },
    paddingNone: {
        padding: '0px',
    }
})

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

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    }

    render() {
        const { order, orderBy, classes } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell key='name' align='left' sortDirection={orderBy==='name'?order:false} className={classes.paddingNone}
                    >
                        <TableSortLabel
                            active={orderBy==='name'}
                            direction={order}
                            onClick={this.createSortHandler('name')}
                        >
                        Expert
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='startTime' sortDirection={orderBy==='startTime'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='startTime'}
                            direction={order}
                            onClick={this.createSortHandler('startTime')}
                        >
                        Time
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='price' align='right' sortDirection={orderBy==='price'?order:false} className={classes.paddingNone}
                    >
                        <TableSortLabel
                            active={orderBy==='price'}
                            direction={order}
                            onClick={this.createSortHandler('price')}
                        >
                        Price
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='goal' align='center' sortDirection={orderBy==='goal'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='goal'}
                            direction={order}
                            onClick={this.createSortHandler('goal')}
                        >
                        Goal
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='rating' align='center' sortDirection={orderBy==='rating'?order:false} className={classes.paddingNone}

                    >
                        <TableSortLabel
                            active={orderBy==='rating'}
                            direction={order}
                            onClick={this.createSortHandler('rating')}
                        >
                        Rating
                        </TableSortLabel>
                    </TableCell>
                    <TableCell key='isPaid' align='center' sortDirection={orderBy==='isPaid'?order:false}
                    >
                        <TableSortLabel
                            active={orderBy==='isPaid'}
                            direction={order}
                            onClick={this.createSortHandler('isPaid')}
                        >
                        Action
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

// EnhancedTableHead.prototype = {
//     order: PropTypes.string.isRequired,
//     orderBy: PropTypes.string.isRequired
// }


class Appointment extends React.Component {
    state = {
        loading: false,
        refreshing: true,
        userId: '',
        upcomingList: [],
        amount: 0,
        isAnswerModalVisible: false,
        isRatingModalVisible: false,
        reason: '',
        progressVisible: false,
        returnedAmount: '',
        alertSuccessVisible: false,
        alertErrorVisible: false,
        errorMessage: '',
        order: 'desc',
        orderBy: 'startTime',
        rowsPerPage: 10,
        page: 0,
        showModalResult: false,
        showModalQuestion: false,
        showModalReason: false,
        showModalRating: false,
        modalTxt: '',
        modalResult: true
    }

    componentWillMount() {
        this.appendUpcoming()
    }

    appendUpcoming() {
        const { auth } = this.props;
        const upcomingList = [];
        const portalType = auth.portalType === 'Learning' ? 'learningID_startTime' : 'expertID_startTime'
        const childID = this.props.auth.uid
        firebase.database().ref('appointments').orderByChild(portalType).startAt(childID).limitToLast(100).once('value').then(snapshot => {
            const collection = snapshot.val();
            const keys = Object.keys(collection);
            let index = keys.length;
            while (index--) {
                const key = keys[index];
                const childData = collection[key];
                if (childData.rating === undefined) {
                    childData.rating = 0
                }
                childData.key = key;
                upcomingList.push(childData);
            }
            upcomingList.sort((fir, sec) => {
                if (fir.startTime > sec.startTime) {
                    return -1
                }
                return 1
            });
            this.setState({ loading: false, refreshing: false, upcomingList: upcomingList })
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: false, refreshing: false, upcomingList: [] })
        });
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

    async handleComplete(upcoming) {
        const now = new Date()
        const appointmentEndtime = moment(upcoming.endTime, 'YYYY-MM-DD, HH:mm:ss A').toDate()
        if (now.getTime() < appointmentEndtime.getTime()) {
            this.setState({showModalResult: true, modalTxt: 'You can only pay after an appointment is completed.'})
            return
        }
        try {
            this.selectedUpcoming = upcoming
            const res = await fetch(ServerAddress+transferUrl, {
                method: 'POST',
                body: JSON.stringify({
                    key: upcoming.key
                }),
            })
            const resJson = await res.json();
            if (resJson.statusCode == 200) {
                if (resJson.body.error == 0) {
                    this.setState({showModalRating: true, modalTxt: 'You successfully complete an appointment. Are you rating this appointment?'})
                } else if (resJson.body.error != 0) {
                    this.setState({showModalResult: true, modalTxt: resJson.body.message})
                }
                return;
            }
            this.setState({showModalResult: true, modalTxt: resJson.body.error.message})
            return;
        } catch (error) {
            this.setState({showModalResult: true, modalTxt: error.message})
        }
    }

    handleCancel(upcoming, callback) {
        firebase.database().ref('appointments/'+upcoming.key).once('value', snapshot=>{
            const data = snapshot.val()
            this.selectedUpcoming = upcoming
            if (data.isRequested == true) {
                if (this.props.auth.portalType == 'Learning') {
                    this.setState({showModalResult: true, modalTxt: 'Your Expert has already requested payment. You can not cancel this appointment.'})
                    return
                }
                this.setState({showModalQuestion: true, modalTxt: 'You have already requested payment. Are you sure that you want to cancel this appointment? You will not receive your funds if you cancel.'})
                return
            }
            this.answerCancelReason()
        })

    }

    answerCancelReason() {
        this.setState({ showModalReason: true, modalTxt: 'Tell what reason for cancel' })
    }

    async refund() {
        const res = await fetch(ServerAddress + refundtUrl, {
            method: 'POST',
            body: JSON.stringify({
                portalType: this.props.auth.portalType,
                key: this.selectedUpcoming.key,
                reason: this.state.reason,
                chargeID: this.selectedUpcoming.chargeID,
                uid: this.props.auth.uid,
                name: this.props.auth.name
            }),
        })
        const resJson = await res.json();
        if (resJson.statusCode == 200 && resJson.body.error == 0) {
            this.setState({showModalResult: true, modalTxt: 'The appointment has successfully been canceled. There is a cancellation fee, so you will be refunded the full appointment costs asides from this fee. You will receive '+(resJson.body.returnedAmount).toFixed(2)+'. Thank you for using X-Purt!'})
            return;
        }
        this.setState({showModalResult: true, modalTxt: resJson.body.error.message})
        return;
    }

    render() {
        const { classes } = this.props
        const { order, orderBy, rowsPerPage, page, upcomingList } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, upcomingList.length - page * rowsPerPage)
        const UpcomingTableHead = withStyles(styles)(EnhancedTableHead)

        return (
            <div>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <UpcomingTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={upcomingList.length}
                    />
                    <TableBody>
                    {
                        stableSort(upcomingList, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(upcoming=>{
                            return (
                                <AppointBlock upcoming={upcoming} pertalType={this.props.auth.pertalType} key={upcoming.appointmentId}
                                    cancel={this.handleCancel.bind(this)}
                                    complete={this.handleComplete.bind(this)}
                                />
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
                    count={upcomingList.length}
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
                <Modal
                    show={this.state.showModalResult}
                    onHide={()=>{
                        this.setState({showModalResult: false})
                        this.appendUpcoming()
                    }}
                >
                    <Modal.Header className={classes.ModalHeader}>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalTxt}</Modal.Body>
                    <Modal.Footer>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}}
                            onClick={()=>{
                                this.setState({showModalResult: false})
                                this.appendUpcoming()
                            }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showModalQuestion}
                    onHide={()=>{
                        this.setState({showModalQuestion: false})
                        this.appendUpcoming()
                    }}
                >
                    <Modal.Header className={classes.ModalHeader}>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalTxt}</Modal.Body>
                    <Modal.Footer>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}} onClick={()=>this.answerCancelReason()}>
                            Yes
                        </Button>
                        <Button variant='outlined' color="primary" classes={{root: classes.Button}} onClick={()=>this.setState({showModalQuestion: false})}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showModalReason} onHide={()=>this.setState({showModalReason: false})}
                >
                    <Modal.Header className={classes.ModalHeader}>
                        {/* <Modal.Title>Success</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                    {this.state.modalTxt}
                    <Divider />
                    <TextField
                        id="standard-with-placeholder"
                        placeholder=""
                        className={classes.textField}
                        margin="normal"
                        onChange={e => this.setState({ answer: e.target.value })}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}}
                            onClick={()=>{
                                this.setState({showModalReason: false})
                                this.refund()
                            }}>
                            Yes
                        </Button>
                        <Button variant='outlined' color="primary" classes={{root: classes.Button}}  onClick={()=>this.setState({showModalReason: false})}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.showModalRating}
                    onHide={()=>{
                        this.setState({showModalRating: false})
                        this.appendUpcoming()
                    }}
                >
                    <Modal.Header className={classes.ModalHeader}>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {this.state.modalTxt}
                    <p/>
                    <Rating
                        emptySymbol={<img src={starEmpty} className={classes.icon} />}
                        fullSymbol={<img src={starFull} className={classes.icon} />}
                        onChange={value=>{
                            this.rating = value
                        }}
                    />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}}
                            onClick={()=>{
                                firebase.database().ref('appointments/' + this.selectedUpcoming.key).update({ rating: this.rating }, error => {
                                    this.setState({ showModalRating: false })
                                    this.appendUpcoming()
                                })
                        }}>
                            Yes
                        </Button>
                        <Button variant='outlined' color="primary" classes={{root: classes.Button}} onClick={()=>this.setState({showModalRating: false})}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Appointment.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth, profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps, {})(withStyles(styles)(Appointment));
