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
      email: "john@example.com",
      phone: "+1234567890",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo: "https://example.com/john.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
      bio: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      photo: "https://example.com/jane.jpg",
    },
    {
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+1122334455",
      bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      photo: "https://example.com/michael.jpg",
    },
    {
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "+1555555555",
      bio: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      photo: "https://example.com/emily.jpg",
    },
    {
      name: "Daniel Wilson",
      email: "daniel@example.com",
      phone: "+1444444444",
      bio: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      photo: "https://example.com/daniel.jpg",
    },
  ];

const Staff = () => {
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
        <div className="staff">
            <div className="addStaff">
                <div className="--flex-center --mt">
                        <h3>Staff Member</h3>
                </div>
                <button className="--btn --btn-primary" style={{ width: "20%" }} onClick={openModal}>
                        Add Staff Member
                </button>
             
            </div>
            <div className="viewStaff"></div>
            <Modal className="Modal"
                isOpen={showModal} // Pass isOpen prop to indicate whether the modal should be open or not
                onClose={closeModal}
                onSubmit={registerStaff}
                formData={formData}
                handleInputChange={handleInputChange}
            />
            <div className="staff-list">
            {/* Map over the staff members array and render a StaffCard for each */}
            {staffMembers.map((user, index) => (
                <StaffCard key={index} user={user} />
            ))}
            </div>
        </div>
    );
};

export default Staff;
