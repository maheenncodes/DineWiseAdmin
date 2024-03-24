import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";
import Modal from "../addCategory/Add.js";


// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setformData({ ...formData, [name]: value });
// };

// const openModal = () => {
//   setShowModal(true);
// };

// const closeModal = () => {
//   setShowModal(false);
// };


const ProductForm = ({
  product,
  productImage,
  imagePreview,
  ingredients,
  handleIngredientsChange,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
           {/* <Modal className="Modal"
                isOpen={showModal} // Pass isOpen prop to indicate whether the modal should be open or not
                onClose={closeModal}
                onSubmit={addCategory}
                formData={formData}
                handleInputChange={handleInputChange}
            /> */}
          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
           <label>Product Description:</label>
          <input
            type="text"
            placeholder="Product Description"
            name="description"
            value={product?.description}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />


          <label>Product Ingredients:</label>
          <textarea
            
            placeholder=""
            name="ingredients"
            value={product?.ingredients}
            onChange={handleInputChange} 
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};


export default ProductForm;