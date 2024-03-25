import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authslice";
import { fetchMenuDetails } from "../../services/restaurantService"; // Import fetchMenuDetails function

const Dashboard = ({ restaurantResponse }) => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuDetails, setMenuDetails] = useState(null); // State to hold menu details

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const details = await fetchMenuDetails(restaurantResponse._id); // Replace with actual restaurant ID
        setMenuDetails(details);
      } catch (error) {
        console.error("Error fetching menu details:", error.message);
      }
    };

    if (isLoggedIn) {
      fetchMenu();
    }
  }, [isLoggedIn]);

  return (
    <div>
      {/* <ProductSummary products={menuDetails} /> Pass menuDetails to ProductSummary */}
      <ProductList products={menuDetails} /> {/* Pass menuDetails to ProductList */}
    </div>
  );
};

export default Dashboard;
