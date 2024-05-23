import React from 'react';
import '../Footerhome/footerhome.css'

const Footerhome = () => {
  return (
    <footer className="padding_4x">
      <div className="flex">
        <section className="flex-content padding_1x">
          <div className='foot-land'>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/About">About</a>
          <a href="/Contact">Contact</a>
          </div>
        </section>
        <section className="flex-content padding_1x">
          <h3>Features</h3>
          {/* <a href="#">Jobs</a>
          <a href="#">Brand Assets</a>
          <a href="#">Investor Relations</a>
          <a href="#">Terms of Service</a> */}
        </section>
        <section className="flex-content padding_1x">
          <h3>Resources</h3>
          {/* <a href="#">Guides</a>
          <a href="#">Research</a>
          <a href="#">Experts</a>
          <a href="#">Agencies</a> */}
        </section>
        {/* <section className="flex-content padding_1x">
          <h3>Newsletter</h3>
          <p>You can trust us. we only send promo offers,</p>
          <fieldset className="fixed_flex">
            <input type="email" name="newsletter" placeholder="Your Email Address" />
            <button className="btn btn_2">Subscribe</button>
          </fieldset>
        </section> */}
      </div>
      <div className="flex">
        <section className="flex-content padding_1x">
          <p>Copyright ©2024 All rights reserved || Mechanic finder</p>
        </section>
        {/* <section className="flex-content padding_1x">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-dribbble"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
        </section> */}
      </div>
    </footer>
  );
};

export default Footerhome;
