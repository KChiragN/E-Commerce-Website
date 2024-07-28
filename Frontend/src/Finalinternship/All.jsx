import React, { useState, useEffect } from 'react';
import Header from './comps/Header'; // Importing Header component
import Footer from './comps/Footer'; // Importing Footer component
import Login from './comps/Login'; // Importing Login component
import Signup from './comps/Signup'; // Importing Signup component
import Slider from './comps/Slider'; // Importing Slider component
import Home from './comps/Home'; // Importing Home component
import Cartpage from './comps/Cartpage'; // Importing Cartpage component
import Shipping from './comps/Shipping'; // Importing Shipping component
import Payment from './comps/Payment'; // Importing Payment component
import About from './comps/About'; // Importing About component
import OrderConfirmation from './comps/OrderSucess'; // Importing OrderConfirmation component
import { searchProducts, getProducts } from '../services/axios-service'; // Importing searchProducts and getProducts functions from axios-service

function All() {
  // State variables to manage component visibility and data
  const [Slider1, setslider1] = useState(true);
  const [Login101, setLogin101] = useState(false);
  const [Signup1, setSignup1] = useState(false);
  const [Home1, setHome1] = useState(false);
  const [Cartpage1, setCartpage1] = useState(false);
  const [Shipping1, setShipping1] = useState(false);
  const [Payment1, setPayment1] = useState(false);
  const [About1, setAbout1] = useState(false);
  const [OrderConfirmation1, setOrderConfirmation1] = useState(false); 
  const [totalPrice, setTotalPrice] = useState(0);// Total price of items in cart
  const [cartItems, setCartItems] = useState([]);// Items in cart
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [allProducts, setAllProducts] = useState([]); // All products
  const [shippingCost, setShippingCost] = useState(null);// Shipping cost
  const [userId, setUserId] = useState(null); // User ID


  // Function to handle changes in total price and cart items
  const handleTotalPriceChange = (price, items) => {
    setTotalPrice(price);
    setCartItems(items);
  };

  // Fetch all products on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await getProducts({ page: 0, size: 1000 }); // Fetch all products with pagination
        setAllProducts(response.content || []);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };
    fetchAllProducts();
  }, []);
  // Function to handle search
  const handleSearch = (query) => {
    if (typeof query === 'string') {
      const queryWords = query.toLowerCase().split(' ');
      const filteredProducts = allProducts.filter(product => {
        const productNameWords = product.name.toLowerCase().split(' ');
        return queryWords.every(word => productNameWords.includes(word));
      });
      console.log('Search results:', filteredProducts);
      setSearchResults(filteredProducts);
    } else {
      console.error('Search query must be a string');
    }
  };

  return (
    <>
     {/* Header component with search functionality */}
      <Header 
        setslider1={setslider1} 
        setSignup1={setSignup1} 
        setLogin101={setLogin101} 
        setHome1={setHome1} 
        setCartpage1={setCartpage1} 
        setShipping1={setShipping1} 
        setPayment1={setPayment1} 
        setAbout1={setAbout1} 
        searchProducts={handleSearch}
        allProducts={allProducts}
        setOrderConfirmation1={setOrderConfirmation1}
         // Pass the search handler to Header
      />
       {/* Conditional rendering of Login component */}
      {
        Login101 && <Login
          setslider1={setslider1} 
          setSignup1={setSignup1} 
          setLogin101={setLogin101} 
          setHome1={setHome1} 
          setCartpage1={setCartpage1} 
          setShipping1={setShipping1} 
          setPayment1={setPayment1} 
          setAbout1={setAbout1}
          setUserId={setUserId}
          setOrderConfirmation1={setOrderConfirmation1}
        />
      }
      {/* Conditional rendering of Signup component */}
      {
        Signup1 && <Signup />
      }
      {/* Conditional rendering of Slider component */}
      {
        Slider1 && <Slider />
      }
      {/* Conditional rendering of Home component with search results */}
      {
        Home1 && <Home searchResults={searchResults} userId={userId} /> // Pass the search results to Home
      }
      {/* Conditional rendering of About component */}
      {
        About1 && <About />
      }
      {/* Conditional rendering of Cartpage component */}

      {
        Cartpage1 && <Cartpage 
          setCartItems={setCartItems} 
          onTotalPriceChange={handleTotalPriceChange} 
          setCartpage1={setCartpage1}
          userId={userId}
        />
      }
      {/* Conditional rendering of Shipping component */}
      {
        Shipping1 && <Shipping 
          setShipping1={setShipping1} 
          setPayment1={setPayment1} 
          totalPrice={totalPrice}
          setShippingCost={setShippingCost}
        />
      }
       {/* Conditional rendering of Payment component */}
      {
        Payment1 && <Payment 
          cartItems={cartItems} 
          setPayment1={setPayment1} 
          setCartPage1={setCartpage1}
          shippingCost={shippingCost}
          setOrderConfirmation1={setOrderConfirmation1}
          userId={userId}
        />
      }
       {/* Conditional rendering of OrderConfirmation component */}
      {
        OrderConfirmation1 && <OrderConfirmation 
        setOrderConfirmation1={setOrderConfirmation1}
        setslider1={setslider1}/> 
      }
      {/* Footer component */}
      <Footer />
    </>
  );
}

export default All;
