import React from "react";
import "./TableCard.scss"; // Import styles for the staff card
import { FaEdit, FaTrashAlt, FaDownload } from "react-icons/fa";
const TableCard = ({ table }) => {
  console.log(table);
  return (
    <div className="staff-card" style={{ width: "70%" }}>
      <img src={table.photo} alt={table.name} className="staff-photo" />
      <div className="staff-details  --flex-between">

        <div >
            <h2>Table No:{table.tableNumber}</h2>
            <p>Capacity: {table.capacity}</p>
        </div>
        <div>
        <span className=" delete --mr">
            <FaDownload
              size={20}
              color={"black"}
            />
          </span>
        <span className=" delete --mr">
            <FaEdit
              size={20}
              color={"red"}
            />
          </span>
        <span className=" delete --mr">
            <FaTrashAlt
              size={20}
              color={"red"}
            />
          </span>

        </div>
        
          
      </div>
    </div>
  );
};

export default TableCard;
