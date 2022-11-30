import React, { Component } from "react";
import "./Home.css"
import IGIMG from "../Assets/instagram.png"
import FBIMG from "../Assets/facebook.png"
import TWIMG from "../Assets/twitter.png"
import LKIMG from "../Assets/linkedin.png"
// import TextTransition, { presets } from "react-text-transition";


class Home extends Component {
    render() {
      return (
        <div>
        <h2 id = 'h2'> </h2>
        <h1 id="h1">Welcome to <b><i>The News Website</i></b></h1>
        <h2 id="h2">One Stop Solution for World Wide News</h2>
        <section className="footer">
            <footer>
              <h3>Founders</h3>
              <p>
                  <h5>Abhay Joshi, Adithya TG, Abhiram H A</h5>
                  <h6>© 2022, The News Website Pvt. Ltd. All Rights Reserved. ®</h6>
              </p>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><img src={IGIMG} alt="l"/></a>&nbsp;
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={FBIMG} alt="l"/></a>&nbsp;
              <a href="https://twitter.com/" target="_blank" rel="noreferrer"><img src={TWIMG} alt="l"/></a>&nbsp;
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><img src={LKIMG} alt="l"/></a>&nbsp;
            </footer>
        </section>
    <div id="bottom"></div>
      </div>
      
      );
    }
  }

export default Home