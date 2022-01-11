import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../css/Main.css";

class Main extends Component {
  render() {
    return (
      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{background: "linear-gradient(74.09deg,#cfb3ff,rgba(190,110,171,.567708) 33.89%,#f17e84 100.2%)"}}>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="# ">
                  <b>
                  Điện thoại
                  </b>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="# ">
                <b>
                  Laptop
                  </b>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="# ">
                <b>
                  Tablet
                  </b>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="# ">
                <b>
                  Phụ kiện
                  </b>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="# ">
                <b>
                  PC, máy in
                  </b>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* slide 1*/}
        <Carousel>
          <Carousel.Item>
            <div className="slide">
              <img
                className="d-block"
                src={require("../Image/banner-4.jpg")}
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slide">
              <img
                className="d-block"
                src={require("../Image/banner-2.png")}
                alt="First slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slide">
              <img
                className="d-block"
                src={require("../Image/banner-3.png")}
                alt="First slide"
              />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Main;
