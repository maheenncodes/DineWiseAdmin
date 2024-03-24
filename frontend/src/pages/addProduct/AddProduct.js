import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/ProductForm/ProductForm";
import { addMenuItem } from "../../services/restaurantService";
import {
    
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  quantity: "",
  price: "",
  description: "", 
  ingredients: "", // Add ingredients to match the product form
  category: "", // Add categoryName to match the product form
  

};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  

  const isLoading = useSelector(selectIsLoading);

  const { name, description, ingredients , price, quantity , category  } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

 
  

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("categoryId", " "); // Assuming you have categoryId in your product state
      formData.append("restaurantId", '65fedf23aeb13eca509bcdaf'); // Assuming you have restaurantId in your product state
      formData.append("isNewCategory", true); // Assuming you have isNewCategory in your product state
      formData.append("categoryName", category); // Assuming you have categoryName in your product state
      formData.append("itemName", name);
      formData.append("itemDescription", description);
      formData.append("itemIngredients", ingredients);
      formData.append("itemPrice", price);
      formData.append("itemQuantity", Number(quantity));
      formData.append("isPopular", false); // Assuming you have isPopular in your product state
      
      formData.append("image", productImage);
  
      
  
      await addMenuItem(formData); 
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Error while saving product:", error);
      // Handle error if needed
    }
  };
  

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;