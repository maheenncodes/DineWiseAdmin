import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const addMenuItem = async (menuItemData) => {
    try {
     
      console.log(menuItemData);
      const formData = new FormData();
      formData.append("categoryId", menuItemData.categoryId);
      formData.append("restaurantId", menuItemData.restaurantId);
      formData.append("isNewCategory", menuItemData.isNewCategory);
      formData.append("categoryName", menuItemData.categoryName);
      formData.append("itemName", menuItemData.itemName);
      formData.append("itemDescription", menuItemData.itemDescription);
      formData.append("itemIngredients", menuItemData.itemIngredients);
      formData.append("itemPrice", menuItemData.itemPrice);
      formData.append("itemQuantity", menuItemData.itemQuantity);
      formData.append("isPopular", menuItemData.isPopular);
      formData.append("image", menuItemData.image); // Append the image file
  
      const response = await axios.post(
        `${BACKEND_URL}/api/restaurants/add_menu_item`,
        formData,
        { 
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data" // Set content type to multipart/form-data for file upload
          }
        }
      );
  
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Menu item added successfully");
      }
      
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      throw new Error(message); // Ensure that an error is thrown for consistent error handling
    }
  };
  