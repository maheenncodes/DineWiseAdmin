import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const addMenuItem = async (formData) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/restaurants/add_menu_item`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
  
      if (response.status === 200) {
        toast.success("Menu item added successfully");
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      throw new Error(message);
    }
  };
  
  