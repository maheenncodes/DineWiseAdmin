import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";
import Loader from "../../components/loader/Loader";
import heroImg from "../../assets/inventory.png";
import { RiProductHuntLine } from "react-icons/ri";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import Nav from "../../components/authNav/AuthNav";


const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      {isLoading}

      <Nav />
      <div className={styles.centered}>
        <div className={styles.blueSection}>
          <img src={heroImg} alt="Inventory" />
          <p> this is an inventory management system</p>
        </div>

        <div className={styles.whiteSection}>
          <div className={styles.form}>
            <Card>
              <div className={styles.form}>
                <div className="--flex-center">
                  <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Register</h2>

                <form onSubmit={register}>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                  />
                  <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <button type="submit" className="--btn --btn-primary --btn-block" style={{ width: '80%' }}>
                      Register
                    </button>

                  </div>
                  
                </form>

                <span className={styles.register}>
                  <Link to="/">Home</Link>
                  <p> &nbsp; Already have an account? &nbsp;</p>
                  <Link to="/login">Login</Link>
                </span>
              </div>
            </Card>
          </div>
        </div>  
      </div>
    </div>
    
  );
};

export default Register;