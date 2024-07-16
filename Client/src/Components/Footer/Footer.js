


import React from 'react';
import '../Footer/Footer.css'

function Footer() {
  return (
    <div className='fot'>
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">  The mechanic will come to the breakdown places.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>Contact</h6>
            <p>Email me at: <a href="mailto:pdinukanth@gmail.com"><strong className="link-email-footer">pdinukanth@gmail.com</strong></a></p>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="#">
              <li><a href="/Home">Home</a></li>
              <li><a href="/About">About</a></li>
              <li><a href="/Contact">Contact</a></li>
            </ul>
          </div>

        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">MechanicFinder &copy; 2024 All Rights Reserved by <a href="#">Mech finder</a>.</p>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
