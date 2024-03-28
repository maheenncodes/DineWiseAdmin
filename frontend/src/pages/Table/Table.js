import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authslice";
import "./Table.scss";
import Modal from "../../components/table/AddTable";
import TableCard from "../../components/table/TableCard";
import axios from "axios";

const initialState = {
  name: "",
  capacity: "", // Default role
};

const Tables = [
  {
    name: "12",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
  },
  {
    name: "10",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
  },
];

const Table = ({restaurantResponse}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [Tables, setTables] = useState([]);
  const [QRcode , setQRcode] = useState([]);

  const { name, capacity } = formData;

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/view_tables?restaurantId=${restaurantResponse}`,
          { withCredentials: true }
        );
        setTables(response.data);
        console.log(restaurantResponse);

      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables(); // Call fetchTables inside useEffect
  }, []);

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

    if (!name || !capacity) {
      return toast.error("All fields are required");
    }

    const userData = {
      name,
      capacity,
    };

    //setIsLoading(true);
    // try {
    //     const data = await registerUser(userData);
    //     toast.success("Table added successfully");
    //     setIsLoading(false);
    //     closeModal(); // Close the modal after successful registration
    // } catch (error) {
    //     setIsLoading(false);
    // }
  };

  return (
    <div>
      <div className="--flex-center --mt">
        <h3>Tables</h3>
      </div>
      <button
        className="--btn --btn-primary --mt  "
        style={{ width: "18rem" }}
        onClick={openModal}
      >
        Add Table
      </button>

      <div className="viewStaff"></div>
      <Modal
        className="Modal"
        isOpen={showModal} // Pass isOpen prop to indicate whether the modal should be open or not
        onClose={closeModal}
        onSubmit={registerStaff}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <div className="--flex-center" style={{ width: "100%" }}>
        <div className="staff-list --mt --flex-dir-column --justify-center --width-100">
          {/* Each Table Render */}
          {Tables.map((table, index) => (
            <div key={index} className="--width-100  --flex-center">
              <TableCard table={table} restaurantResponse={restaurantResponse}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
