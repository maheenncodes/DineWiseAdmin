import React, { useState }  from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import {useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";
import "./Staff.scss";


const initialState = {

    name: "",
    email: "",
    pass: "",


};

const Staff = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    const { name, email, password } = formData;
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
      };


    const registerStaff = async (e) => {
        e.preventDefault();
    
        if(!name || !email || !password ) {
            return toast.error("All fieds are required");
        }
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
          
        const userData = {
            name,
            email,
            password,
            role: "staff",
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

    return(

        <div className="staff">

            <div className="addStaff">
                <div className="card">
                    <div className="--flex-center">
                        <h3>ADD Staff Member</h3>
                    </div>
                    <form onSubmit={registerStaff}>
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
                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <button type="submit" className="--btn --btn-primary" style={{ width: '80%' }}>
                                Add
                            </button>

                        </div>

                    </form>
                    

                </div>
                
            </div>
            <div className="viewStaff">

            </div>


        </div>
    )
};

export default Staff;
