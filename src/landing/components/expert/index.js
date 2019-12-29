import React from 'react';
import Mycarousel from './expert_carousel';
import '../../css/style.css';



class Expert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 25,
      hours: 5,
      total: 125
    };
    this.autocalc = this.autocalc.bind(this);
  }

  autocalc = () => {
    const a = this.state.rating;
    const b = this.state.hours;
    const c = a * b;
    if (c !== this.state.total) {
      this.setState({ total: c });
    }
    if (a === '') {
      this.setState({ rating: 25 });
    }
    if (b === '') {
      this.setState({ hours: 5 });
    }
    if (a < 0) {
      this.setState({ rating: 0 });
    }
    if (b < 0) {
      this.setState({ hours: 0 });
    }
  }

  render() {
    this.autocalc();
    return (
      <div id="pricing">
        <div className="section-title">
          <h2>Telanted Experts</h2>
        </div>
        <table >
          <tr>
            <td>
              <a href="#home">
                <div className="pricing-plan">
                  <div className="pricing-month">
                    <h2>Why be an expert?</h2>
                  </div>
                  <div className="pricing-title">
                    <h5>X-Purt allows you to get paid to teach what you love! In the face of rising global economic uncertainty, why not guard against this by literally earning money to teach skills that you’re passionate about!!</h5>
                  </div>
                </div>
              </a>
            </td>
            <td>
              <a href="#home">
                <div className="pricing-plan" >
                  <div className="pricing-month">
                    <h2>Share your skill</h2>
                  </div>
                  <div className="pricing-title">
                    <h5>With X-Purt you get paid to teach skills that you’re passionate about! You can post pics and videos of your work, and have individuals from around the world book appointments to learn how to do what you do!</h5>
                  </div>
                </div>
              </a>
            </td>
            <td>
              <a href="#home">
                <div className="pricing-plan">
                  <div className="pricing-month">
                    <h2>Flexibility</h2>
                  </div>
                  <div className="pricing-title">
                    <h5>With X-Purt, you yourself set the times that you’re available! Everything is on your own time, at your own price, and from the privacy of your home! You can teach as little or as much as you would like!</h5>
                  </div>
                </div>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <a href="#home">
                <div className="pricing-plan forum">
                  <div className="pricing-month">
                    <h2>Forum</h2>
                  </div>
                  <div className="pricing-title">
                    <h5>Engage with the X-Purt community on the forum, and build your reputation as an expert! Top experts will potentially have the opportunity to teach full classes on the platform!</h5>
                  </div>
                </div>
              </a>
            </td>
          </tr>
          <tr>
            <td colspan='3'>
              <div className='why'>
                <p style={{ fontSize: '24px', color: '#fff', textAlign: 'center' }}>Why Should I Use X-Purt?</p>
                <Mycarousel headtext1='"I am so happy I found the website!"' bodytext1='It was really calming to be able to talk to a student. I was really stressed about the process but just talking to someone who had gone through the process really recently was dope. I highly recommend using SchoolBudd!' />
              </div>
            </td>
          </tr>
        </table>
        <table id='info' style={{ width: '40vw', marginTop: '100px', marginLeft: '20%' }}>
          <tr>
            <td>
              <div >
                <p>Hourly Price:</p><input type="number" className="form-control" placeholder='$ 25' onChange={(e) => this.setState({ rating: e.target.value })} />
              </div>
              <div >
                <p>Hours worked per week:</p><input type="number" className="form-control" placeholder='5 hours' onChange={(e) => this.setState({ hours: e.target.value })} />
              </div>
            </td>
            <td>
              <button name="submit" type="button" id="total">
                <h2>${this.state.total}</h2>
                <h6>Weekly Average</h6></button>
            </td>
          </tr>
          <tr>
            <td>
              <a href='#home'><button id='registerbutton'>Register now</button></a>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}


export default Expert;