import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaDownload } from "react-icons/fa";

const TableCard = ({ table , restaurantResponse }) => {
  const [QR_Code, setQR_Code] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/restaurants/get_qr_code?restaurantId=65fedf23aeb13eca509bcdaf&tableId=${table._id}`,
          { withCredentials: true }
        );
        setQR_Code(response.data);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };

    fetchQRCode();
  }, [table._id]);


  return (
    <div className="staff-card" style={{ width: "70%" }}>
      {/* Set the src attribute to the base64 encoded image data */}
      <img src={`http://localhost:5000/api/restaurants/get_qr_code?restaurantId=${restaurantResponse._id}&tableId=${table._id}`} alt={`QR Code for ${table.name}`} className="staff-photo" />
      <div className="staff-details --flex-between">
        <div>
          <h2>Table No: {table.tableNumber}</h2>
          <p>Capacity: {table.capacity}</p>
        </div>
        <div>
          <span className="delete --mr">
            <a  href={`http://localhost:5000/api/restaurants/get_qr_code?restaurantId=${restaurantResponse._id}&tableId=${table._id}`} download alt={`QR Code for ${table.name}`}><FaDownload size={20} color={"black"} /></a>
          </span>
          <span className="delete --mr">
            <FaEdit size={20} color={"red"} />
          </span>
          <span className="delete --mr">
            <FaTrashAlt size={20} color={"red"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
