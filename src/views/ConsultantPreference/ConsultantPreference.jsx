  
import React from "react"
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles"
import GridItem from "components/Grid/GridItem.jsx"
import GridContainer from "components/Grid/GridContainer.jsx"
import Card from "components/Card/Card.jsx"
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardHeader from "components/Card/CardHeader.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Form, DropdownButton, Dropdown } from 'react-bootstrap'
import Slider from '@material-ui/core/Slider'
import MultiSelect from "@khanacademy/react-multi-select"
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Button from "@material-ui/core/Button"
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Add from '@material-ui/icons/Add'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Edit from '@material-ui/icons/Edit'
import Remove from '@material-ui/icons/Remove'
import { Modal } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import ImageUploader from "react-images-upload"
import Avatar from '@material-ui/core/Avatar'
import {specialties} from '../../const'
import './ConsultantPreference.css'

const styles = theme => ({
    ModalHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    ModalBody: {
    },
    Avatar: {
        marginRight: 10,
        width: 100,
        height: 100,
    },

    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    Button: {
        height: 35,
        borderRadius: 20,
        margin: 10,
        '&:focus': {
            outline: 'none'
        },
        fontSize: '12px'
    },
    pic: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    picRow: {
        display: 'flex',
        flexDirection: 'col',
    }
})


class ConsultantPreference extends React.Component {
    state = {
        price: 140,
        // specialties: [],
        availabilityPreferences: '',
        typeExpert: '',
        yearsInField: '',
        open: false,
        pic: [],
        pIndex: 0,
        showModalResult: false,
        pictureFile: null,
        pictureDataURL: null,
        description: '',
        modelMode: ''
    }

    //could have mfs upload 3 images and text descriptions
    //could have a preview button

    componentWillMount() {
        firebase.database().ref('experts/'+this.props.auth.uid).once('value', snapshot=>{
            const { yearsInField, typeExpert, price, bio, availabilityPreferences, pic } = snapshot.val();
            //specialties
            console.log(pic)
            this.setState({
                yearsInField: yearsInField || 'How long have you been in your field?',
                typeExpert: typeExpert || 'Type of Expert',
                price: price || 140,
                pic: pic?pic:[]
                // availabilityPreferences: availabilityPreferences || 'Set Availability Preferences',
                // specialties: specialties || []
            });
        })
    }

    onDrop = (pictureFiles, pictureDataURLs) => {
		if (pictureFiles.length > 0) {
            const pictureFile = pictureFiles[0]
            const pictureDataURL = pictureDataURLs[0]
            this.setState({pictureDataURL, pictureFile})
			return
		}
        this.setState({pictureDataURL: null, pictureFile: null})
        return
    }


    render() {
        const {classes} = this.props

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Card>
                            <CardHeader color='primary'>
                                <h4 className={classes.cardTitleWhite}>Expert Preferences</h4>
                                <p className={classes.cardCategoryWhite}>Complete your preferences</p>
                            </CardHeader>
                            <CardBody>
                                <Form.Group controlId="formBasicPrice" className='formgroup'>
                                    <Form.Label>Your hourly price? <span className='highlight'>${this.state.price}/h</span></Form.Label>
                                    <Slider
                                        className='slider'
                                        min={5}
                                        max={250}
                                        step={1}
                                        value={this.state.price}
                                        aria-labelledby="label"
                                        onChange={this.handlePriceChange}
                                    />
                                </Form.Group>
                                {/* <Form.Group controlId="formBasicSpecialities" className='formgroup' >
                                    <Form.Label
                                    >
                                    Set consultant specialities</Form.Label>
                                    <MultiSelect
                                        ref={this.assign_specialties}
                                        options={specialties}
                                        selected={this.state.specialties}
                                        onSelectedChanged={specialties => this.setState({specialties})}
                                    >
                                    </MultiSelect>
                                </Form.Group> */}
                                {/* <Form.Group controlId="formBasicPortal" className='formgroup'>
                                    <Form.Label>Set Availability Preferences</Form.Label>
                                    <DropdownButton
                                        ref={this.assign_availabilityPreferences}
                                        size="lg"
                                        className='preferenceDropdownButton'
                                        title={this.state.availabilityPreferences?this.state.availabilityPreferences:'Set availability preference'}
                                    >
                                        <Dropdown.Item eventKey="Just Hourly or Less" onClick={()=>{this.setState({availabilityPreferences: 'Just Hourly or Less'})}}>Just Hourly or Less</Dropdown.Item>
                                        <Dropdown.Item eventKey="Just Packages (10+ hours)" onClick={()=>{this.setState({availabilityPreferences: 'Just Packages (10+ hours)'})}}>Just Packages (10+ hours)</Dropdown.Item>
                                        <Dropdown.Item eventKey="Both Hourly and Package" onClick={()=>{this.setState({availabilityPreferences: 'Both Hourly and Package'})}}>Both Hourly and Package</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group> */}
                                <Form.Group controlId="formBasicCategory" className='formgroup'>
                                    <Form.Label>Pick an area of expertise</Form.Label>
                                    <DropdownButton
                                        ref={this.assign_typeExpert}
                                        size="lg"
                                        className='preferenceDropdownButton'
                                        title={this.state.typeExpert?this.state.typeExpert:'Pick an area of expertise'}
                                    >
                                    <Dropdown.Item eventKey="Nutrition" onClick={()=>{this.setState({typeExpert: 'Nutrition'})}}>Nutrition</Dropdown.Item>
                                    <Dropdown.Item eventKey="Sewing or Knitting" onClick={()=>{this.setState({typeExpert: 'Sewing or Knitting'})}}>Sewing or Knitting</Dropdown.Item>
                                    <Dropdown.Item eventKey="Woodworking or Whittling" onClick={()=>{this.setState({typeExpert: 'Woodworking or Whittling'})}}>Woodworking or Whittling</Dropdown.Item>
                                    <Dropdown.Item eventKey="Visual Art" onClick={()=>{this.setState({typeExpert: 'Visual Art'})}}>Visual Art</Dropdown.Item>
                                    <Dropdown.Item eventKey="Fitness and Health" onClick={()=>{this.setState({typeExpert: 'Fitness and Health'})}}>Fitness and Health</Dropdown.Item>                                        {/* <Dropdown.Item eventKey="Current College Student" onClick={()=>{this.setState({typeExpert: 'Current College Student'})}}>Current College Student</Dropdown.Item> */}
                                    </DropdownButton>
                                </Form.Group>
                                <Form.Group controlId="formBasicYears" className='formgroup'>
                                    <Form.Label>Years in Field</Form.Label>
                                    <DropdownButton
                                        ref={this.assign_yearsInField}
                                        size="lg"
                                        className='preferenceDropdownButton'
                                        title={this.state.yearsInField?this.state.yearsInField:'Years as Expert'}
                                    >
                                        <Dropdown.Item eventKey="0-1" onClick={()=>{this.setState({yearsInField: '0-1'})}}>0-1 years</Dropdown.Item>
                                        <Dropdown.Item eventKey="2-3" onClick={()=>{this.setState({yearsInField: '2-3'})}}>2-3 years</Dropdown.Item>
                                        <Dropdown.Item eventKey="4-5" onClick={()=>{this.setState({yearsInField: '4-5'})}}>4-5 years</Dropdown.Item>
                                        <Dropdown.Item eventKey="> 5" onClick={()=>{this.setState({yearsInField: '> 5'})}}>> 5years</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group>

                                <Form.Group controlId="formPictureUpload" className='formgroup'>
                                    <Form.Label> Upload pics and descriptions of your work: <span className='highlight'></span></Form.Label>
                                    <div className="col">
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
                                    <IconButton
                                        key="plus"
                                        aria-label="plus"
                                        color='primary'
                                        onClick={()=>this.setState({showModalResult: true, modelMode: 'Save'})}
                                    >
                                        <Add />
                                    </IconButton>
                                    {
                                        this.state.pic.length > 0 &&
                                            <div className={classes.pic}>
                                                <IconButton
                                                    key="Edit"
                                                    aria-label="Edit"
                                                    color='primary'
                                                    disabled={this.state.pIndex>=this.state.pic.length}
                                                    onClick={()=>{
                                                        this.setState({
                                                            pictureFile: this.state.pic[this.state.pIndex].pictureFile,
                                                            pictureDataURL: this.state.pic[this.state.pIndex].pictureDataURL,
                                                            description: this.state.pic[this.state.pIndex].description,
                                                            showModalResult: true,
                                                            modelMode: 'Save'
                                                        })
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    key="Remove"
                                                    aria-label="Remove"
                                                    color='primary'
                                                    disabled={this.state.pIndex>=this.state.pic.length}
                                                    onClick={()=>{
                                                        var pIndex = this.state.pIndex
                                                        const pic = this.state.pic
                                                        if (pic.length == 1) {
                                                            this.setState({pic: [], pIndex: 0})
                                                            return
                                                        }
                                                        pic.splice(pIndex, 1)
                                                        if (pic.length <= 1) {
                                                            pIndex = 0
                                                        }
                                                        this.setState({pic, pIndex})
                                                    }}
                                                >
                                                    <Remove />
                                                </IconButton>
                                                {
                                                    this.state.pic[this.state.pIndex].pictureDataURL &&
                                                    <Avatar
                                                        classes={{ root: classes.Avatar }}
                                                        alt={`Avatar`}
                                                        src={this.state.pic[this.state.pIndex].pictureDataURL}
                                                    />
                                                }
                                                {
                                                    this.state.pic[this.state.pIndex].description &&
                                                    <TextField
                                                        readOnly
                                                        multiline
                                                        fullWidth
                                                        rowsMax={5}
                                                        InputProps={{disableUnderline: true}}
                                                        value={this.state.pic[this.state.pIndex].description}
                                                        />
                
                                                }
                                            </div>
                                    }
                                    <IconButton
                                        key="right"
                                        aria-label="right"
                                        color='primary'
                                        onClick={()=>{
                                            const pIndex = this.state.pIndex+1
                                            this.setState({pIndex})
                                        }}
                                        disabled={(this.state.pIndex+1)>=this.state.pic.length}
                                    >
                                        <ChevronRight />
                                    </IconButton>
                                    </div>
                                </Form.Group>
                                
                            </CardBody>
                            <CardFooter>
                                <Button variant="contained" color="primary" classes={{root: classes.Button}}
                                disabled={this.state.updateDisable}
                                onClick={async () => {
                                    const pic = this.state.pic
                                    if (pic.length > 0) {
                                        const uploadPic = []
                                        for (var i=0;i<pic.length;i++) {
                                            var pictureDataURL
                                            const pictureRef = firebase.storage().ref().child(`${new Date().getTime()}_avatar`)
                                            if (pic[i].pictureDataURL) {
                                                pictureDataURL = pic[i].pictureDataURL
                                            } else {
                                                await pictureRef.put(pic[i].pictureFile, { contentType: 'image/jpg' })
                                                pictureDataURL = await pictureRef.getDownloadURL()
                                            }
                                            uploadPic.push({pictureDataURL, description: pic[i].description})
                                        }
                                        firebase.database().ref('experts/'+this.props.auth.uid).update({
                                            approved: 1,
                                            // availabilityPreferences: this.state.availabilityPreferences,
                                            price: this.state.price,
                                            // specialties: this.state.specialties,
                                            typeExpert: this.state.typeExpert,
                                            yearsInField: this.state.yearsInField,
                                            pic: uploadPic
                                        }
                                        , error=>{
                                            this.setState({open: true})
                                        })
                                        return
                                    }
                                    firebase.database().ref('experts/'+this.props.auth.uid).update({
                                        approved: 1,
                                        // availabilityPreferences: this.state.availabilityPreferences,
                                        price: this.state.price,
                                        // specialties: this.state.specialties,
                                        typeExpert: this.state.typeExpert,
                                        yearsInField: this.state.yearsInField,
                                        pic: []
                                    }
                                    , error=>{
                                        this.setState({open: true})
                                    })
                                }}
                                >
                                    Update
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>

                    {/* <GridItem
                    //  xs={12} sm={12} md={4}
                    >
                                        <CustomInput
                                            labelText="First Name"
                                            id="firstName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.firstName}
                                            onChange={(event) => {
                                                this.setState({ firstName: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Last Name"
                                            id="lastName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            value={this.state.lastName}
                                            onChange={(event) => {
                                                this.setState({ lastName: event.target.value.trim() })
                                            }}
                                        />
                                    </GridItem> */}

                </GridContainer>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose.bind(this)}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Preferences are saved.</span>}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose.bind(this)}
                    >
                        <CloseIcon />
                    </IconButton>,
                    ]}
                />
                <Modal
                    show={this.state.showModalResult}
                    onHide={()=>{
                        this.setState({showModalResult: false})
                    }}
                >
                    <Modal.Header className={classes.ModalHeader}>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={classes.ModalBody}>
                        <ImageUploader
                            withLabel={false}
                            withIcon={false}
                            withPreview={true}
                            singleImage={true}
                            onChange={this.onDrop}
                            defaultImages={this.state.pictureDataURL?[this.state.pictureDataURL]:[]}
                            imgExtension={[".jpg", ".png"]}
                        />
                        <TextField
                            id="filled-textarea"
                            fullWidth
                            placeholder="Write your description"
                            multiline
                            margin="normal"
                            variant="outlined"
                            value={this.state.description}
                            onChange={event=>{
                                this.setState({description: event.target.value})
                            }}
                        />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}}
                            onClick={()=>{
                                const pic = this.state.pic
                                if (this.state.modelMode == 'Add') {
                                    pic.push({pictureFile: this.state.pictureFile, pictureDataURL: this.state.pictureDataURL, description: this.state.description})
                                } else if (this.state.modelMode == 'Save') {
                                    console.log('pictureFile:', this.state.pictureFile)
                                    console.log('description:', this.state.description)
                                    if (this.state.pictureFile == null && !this.state.description) {
                                        pic.splice(this.state.pIndex, 1)
                                    } else {
                                        pic[this.state.pIndex] = {
                                            pictureFile: this.state.pictureFile, pictureDataURL: this.state.pictureDataURL, description: this.state.description
                                        }
                                    }
                                }
                                this.setState({showModalResult: false, pic, pictureFile: null, pictureDataURL: null, description: ''})
                            }}>
                            {this.state.modelMode}
                        </Button>
                        <Button variant='contained' color="primary" classes={{root: classes.Button}}
                            onClick={()=>{
                                this.setState({showModalResult: false, pictureFile: null, pictureDataURL: null, description: ''})
                            }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false})
    }

    handlePriceChange = (event, value) => {
        this.setState({ price: value });
    };

}

ConsultantPreference.propTypes = {
    classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {})(withStyles(styles)(ConsultantPreference));