import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";
import "./Order.scss";
import OrderCard from "../../components/orders/OrderCard";

const initialState = {
    name: "",
    email: "",
    password: "",
    role: "staff", // Default role
};

const staffMembers = [
    {
      name: "John Doe",
      photo: "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
    {
      name: "Jane Smith",
      photo: "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    },
  ];

const Order = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);

    const { name, email, password, role } = formData;


    

    

    return (
        <div >

            

            <div className="--flex-center --mt">
                    <h3>Orders</h3>
            </div>
            
            
            
             
           
            <div className="viewStaff"></div>

           <div className="--flex-center" style={{ width: "100%" }}>
                <div className="staff-list --mt --flex-dir-column --justify-center --width-100">
                    {/* Each Staff Render */}
                    {staffMembers.map((user, index) => (
                        <div key={index} className="--width-100  --flex-center">
                            <OrderCard user={user} />
                        </div>
                    ))}
                </div>
            
        </div>





        </div>
    );
};

export default Order;
