import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";
import "./Staff.scss";
import Modal from "../../components/staff/AddStaff";
import StaffCard from "../../components/staff/StaffCard";

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

const Table = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);

    const { name, email, password, role } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const registerStaff = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            return toast.error("All fields are required");
        }
        if (password.length < 6) {
            return toast.error("Passwords must be at least 6 characters");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }

        const userData = {
            name,
            email,
            password,
            role: "staff", // Include role in user data
        };

        setIsLoading(true);
        try {
            const data = await registerUser(userData);
            toast.success("Staff added successfully");
            setIsLoading(false);
            closeModal(); // Close the modal after successful registration
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <div >

            

            <div className="--flex-center --mt">
                    <h3>Staff Member</h3>
            </div>
            <button className="--btn --btn-primary --mt  " style={{ width: "18rem" }} onClick={openModal}>
                    Add Staff Member
            </button>
            
            
             
           
            <div className="viewStaff"></div>
            <Modal className="Modal"
                isOpen={showModal} // Pass isOpen prop to indicate whether the modal should be open or not
                onClose={closeModal}
                onSubmit={registerStaff}
                formData={formData}
                handleInputChange={handleInputChange}
            />
           <div className="--flex-center" style={{ width: "100%" }}>
                <div className="staff-list --mt --flex-dir-column --justify-center --width-100">
                    {/* Each Staff Render */}
                    {staffMembers.map((user, index) => (
                        <div key={index} className="--width-100  --flex-center">
                            <StaffCard user={user} />
                        </div>
                    ))}
                </div>
            
        </div>





        </div>
    );
};

export default Table;
