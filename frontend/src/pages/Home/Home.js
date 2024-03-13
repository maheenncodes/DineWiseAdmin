import React from "react";
import { TbSquareRoundedLetterB } from "react-icons/tb";

import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img-01.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="--flex-between ">
        <div className="logo">
          <TbSquareRoundedLetterB size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
            <button className="--btn --btn-primary2">
               <Link to="/register">Register</Link>
              </button>
              
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary2">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary2">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>BizzStock - A Stock Management Solution</h2>
          <p>
          Welcome to Bizzstock! The perfect solution for small shop owners seeking easy inventory management. 
          Say goodbye to stock headaches and hello to streamlined organization. Join Bizzstock today and take control of your inventory with ease!
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">Contact Us</Link>
            </button>
          </div>
    
        </div>

        <div className="hero-image">
          <img src={heroImg} style={{ width: '600px', height: '500px' }} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-darkgrey">{num}</h3>
      <p className="--color-darkgrey">{text}</p>
    </div>
  );
};

export default Home;