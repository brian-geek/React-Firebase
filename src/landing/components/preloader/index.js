import React from 'react';
import '../../css/style.css';


class Preloader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show : 1,
      exist: 'flex'
    }
    this.hiding = this.hiding.bind(this);
    this.autofunc = this.autofunc.bind(this);
  }
  
  hiding = () => {
    this.setState({ show: 0 })
  }
  
  unexist = () => {
    this.setState({ exist: 'none'});
  }

  autofunc = ()=> {
    setTimeout(
      this.hiding,
      1000
    );
    setTimeout(
      this.unexist,
      3000
    );
  }
  
  render() {
    this.autofunc();
    return(
      <div className="preloader" style = {{opacity: this.state.show, display: this.state.exist}}>
        <div className="sk-spinner sk-spinner-pulse"></div>
        <br /> 
        <p> Just a second. Loading... </p>
      </div>
    );
  }
}

export default Preloader;