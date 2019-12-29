import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import Avatar from '@material-ui/core/Avatar'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Rating from 'react-rating'
import starEmpty from '../../assets/img/star-empty.png'
import starFull from '../../assets/img/star-full.png'

const styles = theme => ({
    Button: {
        height: 35,
        borderRadius: 20,
        margin: 10,
        '&:focus': {
            outline: 'none'
        },
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
    Name: {
        // lineHeight: '4em'
        // display: 'inline-block',
        // margin: '0 auto'
    },
    icon: {
        width: '25px',
        height: '25px'
    },

    paddingNone: {
        padding: '0px',
    }

})

class AppointBlock extends React.Component {

    state = {
        userName: '',
        profileImage: '',
        showModal: false,
        disabledCancel: false,
        disabledComplete: false,
    }

    componentWillMount() {
        var profileId;
        if (this.props.portalType === 'Learning') {
            profileId = this.props.upcoming.learningID
        } else {
            profileId = this.props.upcoming.expertID
        }
        firebase.database().ref('users').child(profileId).on('value', (snapshot) => {
            var childData = snapshot.val();
            if (childData) {
                const userName = childData.portal=='Expert'?childData.firstName + ' ' + childData.lastName : childData.userName
                this.setState({ profileImage: childData.profilePicture !== undefined ? childData.profilePicture : '', userName })
            }
        })
    }

    render() {
        const { classes } = this.props
        return (
            <TableRow
                hover
                tabIndex={-1}
                key={this.props.upcoming.appointmentId}
            >
                <TableCell className={classes.paddingNone}
                    component='th'
                >
                    <div className={classes.Consultant}>
                        {

                            this.state.profileImage ?
                                <Avatar
                                    classes={{ root: classes.Avatar }}
                                    alt={`Avatar`}
                                    src={this.state.profileImage}
                                />
                                :
                                this.state.userName ?
                                    <Avatar
                                        classes={{ root: classes.Avatar }}
                                        alt={`Avatar`}
                                        src={this.state.profileImage}
                                    >
                                        {this.state.userName.substring(0, 1)}
                                    </Avatar>
                                    :
                                    <Avatar
                                        classes={{ root: classes.Avatar }}
                                    />
                        }
                        <span className={classes.Name} >{this.state.userName}</span>
                    </div>
                </TableCell>
                <TableCell>
                    {this.props.upcoming.startTime}
                </TableCell>
                <TableCell align='right' className={classes.paddingNone}>
                    {this.props.upcoming.price}
                </TableCell>
                <TableCell align='center'>
                    {this.props.upcoming.goal}
                </TableCell>
                <TableCell className={classes.paddingNone}>
                    {this.props.upcoming.isPaid &&
                        <Rating
                            initialRating={this.props.upcoming.rating}
                            readonly
                            emptySymbol={<img src={starEmpty} className={classes.icon} />}
                            fullSymbol={<img src={starFull} className={classes.icon} />}
                            style={{ display: 'flex', flexDirection: 'row' }} />
                    }
                </TableCell>
                <TableCell>
                    {!this.props.upcoming.isPaid &&
                        <div>
                            <Button color="primary" variant="contained" classes={{ root: classes.Button }}
                                // disabled={this.state.disabledComplete}
                                onClick={() => {
                                    this.setState({ disabledComplete: true })
                                    this.props.complete(this.props.upcoming)
                                }}
                            >
                                {
                                    this.props.propTypes === 'Expert' ? 'Request' : 'Complete'
                                }
                            </Button>
                            <Button color="primary" variant="contained" classes={{ root: classes.Button }}
                                // disabled={this.state.disabledCancel}
                                onClick={() => {
                                    this.setState({ disabledCancel: true })
                                    this.props.cancel(this.props.upcoming)
                                }}
                            >
                                Cancel
                        </Button>
                        </div>
                    }
                </TableCell>
            </TableRow>
        )
    }
}

AppointBlock.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AppointBlock)
