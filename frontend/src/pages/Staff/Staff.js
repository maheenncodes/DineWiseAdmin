import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/staff/AddStaff";
import StaffCard from "../../components/staff/StaffCard";
import "./Staff.scss";
import { fetchMenuDetails } from "../../services/restaurantService"; // Import fetchMenuDetails function

export const BACKEND_URL = "http://localhost:5000";


const Staff = ( {restaurantResponse} ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // Initialize formData with default values
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        role: "staff",
    });
    const [showModal, setShowModal] = useState(false);
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        const fetchStaffMembers = async () => {
            setIsLoading(true);
            try {
                console.log(restaurantResponse._id);
                const response = await fetch(`${BACKEND_URL}/api/restaurants/view_staff?restaurantId=${restaurantResponse._id}`, {
                    credentials: 'include', // Important if your backend expects cookies for authentication
                  });
                if (!response.ok) { 
                    throw new Error('Could not fetch staff members');
                }
                const data = await response.json();
                setStaffMembers(data); // Assuming your backend returns an array of staff members
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error(error.message || 'Failed to fetch staff members');
            }
        };
    
        fetchStaffMembers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
        console.log(formData);
    };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const registerStaff = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("All fields are required");
        }
        if (formData.password.length < 6) {
            return toast.error("Passwords must be at least 6 characters");
        }
        if (!validateEmail(formData.email)) {
            return toast.error("Please enter a valid email");
        }

        setIsLoading(true);
        try {
            await registerUser(formData);
            toast.success("Staff added successfully");
            setStaffMembers([...staffMembers, formData]); // Optionally update the list
            closeModal();
        } catch (error) {
            toast.error("An error occurred while adding the staff member");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="--flex-center --mt">
                <h3>Staff Member</h3>
            </div>
            <button className="--btn --btn-primary --mt" style={{ width: "18rem" }} onClick={openModal}>
                Add Staff Member
            </button>
            {showModal && (
                <Modal
                    isOpen={showModal}
                    onClose={closeModal}
                    onSubmit={registerStaff}
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
            )}

            <div className="--flex-center" style={{ width: "100%" }}>
                <div className="staff-list --mt --flex-dir-column --justify-center --width-100">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        staffMembers.map((user, index) => (
                            <div key={index} className="--width-100 --flex-center">
                                <StaffCard restaurantId={restaurantResponse._id} user={user} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Staff;