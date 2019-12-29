import React from 'react';
import '../../css/style.css';
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const customstyle = {
  content : {
    position : 'absolute',
    top : '5%',
    bottom: '20%',
    left: '30%',
    right: '30%',
    backgroundColor: '#60d9eb',
    borderRadius: '5px',
    transition : 'all 0.4s ease-in-out',
    padding : '0 30px 0 30px',
    opacity: '0.9'
  }
}


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showmodal : false,
      display : 'none'
    }
    this.modalfunction = this.modalfunction.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showmobile = this.showmobile.bind(this);
    this.hidemobile = this.hidemobile.bind(this);
  }

  showmobile = () => {
    this.setState({
      display: 'block'
    });
  }
  
  hidemobile = () => {
    this.setState({
      display: 'none'
    });
  }
  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  } 

  modalfunction = () => {
    this.setState({ showmodal : true});
  }

  closeModal = () => {
    this.setState({ showmodal : false });
  }

  render() {
    return(
      <>
        <div class="navbar-default">
          <div class="container">

            <div className="navbar-header">
              <a href="#" className="navbar-brand"><span>X</span>-purt</a>
              <p className='icon' onClick = {this.showmobile}>&#9776;</p>
            </div>

            <div className="navbar-collapse">
                <a href="#home" className="menu">Home</a>
                <a href="#about" className="menu">Why X-Purt?</a>
                <a href="#screenshot" className="menu">Learners</a>
                <a href="#pricing" className="menu">Experts</a>
                <a href="#newsletter" className="menu">Contact</a>
                <a href="#" className="menu" data-toggle="modal" data-target="#modal1" onClick = {this.modalfunction}>Sign In/Up</a>
            </div>

            <div className='responsive-nav' style = {{display: this.state.display}}>
                <span><p className="times" onClick={this.hidemobile}>&times;</p></span>
                <a href="#home" ><p className="resmenu">Home</p></a>
                <a href="#about" ><p className="resmenu">Why X-Purt?</p></a>
                <a href="#screenshot" className="resmenu"><p className="resmenu">Learners</p></a>
                <a href="#pricing" className="resmenu"><p className="resmenu">Experts</p></a>
                <a href="#newsletter" className="resmenu"><p className="resmenu">Contact</p></a>
                <a href="#" className="resmenu"data-toggle="modal" data-target="#modal1" onClick = {this.modalfunction}><p className="resmenu">Sign In/Up</p></a>
            </div>


          </div>
        </div>
        <Modal
        isOpen = {this.state.showmodal}
        onRequestClose = {this.closeModal}
        contentLable = 'Contact Form'
        style = {customstyle}
        className = 'contact'
        >
           <div className='contact-title'>
               <Button type="button"  variant="contained" color="secondary" onClick={this.closeModal} aria-label="Close" style={{width: '20px'}}><span aria-hidden="true">&times;</span></Button>
               <h2 className="modal-title">Contact Form</h2>
           </div>
               <form action="#" method="post" className='contact-form'  noValidate autoComplete="off">
                <TextField  label="Name" variant="filled" style={{width: '100%'}}/>
                <br/>
                <TextField  label="Email" variant="filled" style={{width: '100%'}}/>
                <br/>
                <TextField  label="Subject" variant="filled" style={{width: '100%'}}/>
                <br/>
                <TextField  label="message" variant="filled" style={{width: '100%'}}/>
               </form>
        </Modal>
      </>
    );
  }
}


export default Navigation;