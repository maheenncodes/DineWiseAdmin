import React from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./productList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ProductList = ({ products }) => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product.",
      buttons: [
        {
          label: "Delete",
          // onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  return (
    <div className="product-list">
      
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Menu Items</h3>
          </span>
        </div>

        <div className="table">
          {products ? (
            <>
              {products.length === 0 ? (
                <p>-- No product found, please add a product...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Item Name</th>
                      <th>Category Title</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((category, index) => (
                      <React.Fragment key={category._id}>
                        
                        {category.itemList.map((item, i) => (
                          <tr key={item._id}>
                            <td>{index * category.itemList.length + i + 1}</td>
                            <td>{item.name}</td>
                            <td>{category.categoryTitle}</td>
                            <td>{item.price}</td>
                            <td>
                              <span>
                                <AiOutlineEye
                                  size={25}
                                  color={"black"}
                                  // onClick={}
                                />
                              </span>
                              <span>
                                <FaEdit
                                  size={20}
                                  color={"black"}
                                  // onClick={}
                                />
                              </span>
                              <span>
                                <FaTrashAlt
                                  size={20}
                                  color={"red"}
                                  // onClick={}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <SpinnerImg />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
