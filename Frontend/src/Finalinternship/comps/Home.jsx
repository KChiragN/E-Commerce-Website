import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
    getProducts, 
    getCategories, 
    getProductsByCategoryId, 
    addToCart, 
    updateCartQuantity, 
    deleteCartItem, 
    getCartItems, 
    getMostRecentUserId,
    getCartItemsByUserId
} from '../../services/axios-service';


// Home component displays products, categories, and handles cart operations
function Home({ searchResults,userId }) {
    // State variables for categories, products, and cart items
    const [cat, setCat] = useState([]);
    const [prod, setProd] = useState([]);
    const [actcate, setActcate] = useState("All Items");
    const [perpage, setPerpage] = useState(5);
    const [nopages, setNopages] = useState(1);
    const [actpge, setActpge] = useState(1);
    const [cart, setCart] = useState([]);
    const [searchActive, setSearchActive] = useState(false); // Track search activity
    const [popupMessage, setPopupMessage] = useState(''); // Popup message state
    const [showPopup, setShowPopup] = useState(false); // Popup visibility state

    // Fetch categories and cart items when component mounts or userId changes
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCat(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        const fetchCartItems = async () => {
            try {
                const response = await getCartItemsByUserId(userId);
                setCart(response);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };
    
        fetchCategories();
        if (userId) {
            fetchCartItems();
        }
    }, [userId]);
    
    // Update products based on search results
    useEffect(() => {
        if (searchResults && searchResults.length > 0) {
            setProd(searchResults);
            setNopages(1); // Assuming search results fit on one page
            setSearchActive(true); // Search is active
        } else if (searchResults && searchResults.length === 0) {
            setProd([]); // No search results found
            setNopages(1); // No pages for no results
            setSearchActive(true); // Search is active
        } else {
            setSearchActive(false); // Search is not active
            fetchData();
        }
    }, [searchResults]);

    // Fetch data if search is not active
    useEffect(() => {
        if (!searchActive) {
            fetchData();
        }
    }, [actpge, actcate, perpage]);

    // Function to fetch data from API based on current category and pagination
    const fetchData = async () => {
        try {
            let response;
            if (actcate === "All Items") {
                response = await getProducts({ page: actpge - 1, size: perpage });
            } else {
                response = await getProductsByCategoryId(actcate, { page: actpge - 1, size: perpage });
            }
            //console.log('Fetched products:', response);
            console.log('Fetching products for page', actpge, ':', response); // // Log the fetched products
            if (Array.isArray(response)) {
                setProd(response);
            } else if (response && response.content) {
                setProd(response.content);
            } else {
                setProd([]);
            }
            setNopages(response.totalPages || 1);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

 // Handle category click to filter products
    const handleClick = (data) => {
        setSearchActive(false); // Reset search active state
        setActpge(1); // Reset to first page when category changes
        if (data === "All Items") {
            setActcate("All Items");
        } else {
            const categoryId = cat.find((category) => category.name === data)?.categoryId;
            if (categoryId) {
                setActcate(categoryId);
            } else {
                console.log("Category ID not found for:", data);
            }
        }
    };

  // Handle adding or updating product quantity in the cart
    const handleAddToCart = async (productId, quantityChange) => {
        try {
            const loggedInUserId = userId;
            console.log(loggedInUserId);

            const existingCartItem = cart.find(item => item.product.productId === productId);

            if (existingCartItem) {
                const updatedQuantity = existingCartItem.quantity + quantityChange;
                if (updatedQuantity === 0) {
                    await deleteCartItem(existingCartItem.cartItemId);
                    const updatedCart = cart.filter(item => item.cartItemId !== existingCartItem.cartItemId);
                    setCart(updatedCart);
                    showPopupMessage('Product removed from cart');
                } else {
                    await updateCartQuantity(existingCartItem.cartItemId, updatedQuantity);
                    const updatedCart = cart.map(item => 
                        item.product.productId === productId ? { ...item, quantity: updatedQuantity } : item
                    );
                    setCart(updatedCart);
                    showPopupMessage('Quantity updated');
                }
            } else {
                const requestData = {
                    user: { userId: loggedInUserId },
                    product: prod.find(product => product.productId === productId),
                    quantity: 1
                };
                             
                const response = await addToCart(requestData);
                setCart([...cart, response]);
                showPopupMessage('Product added to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

  // Show a popup message
    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 3000);
    };

    return (
        <>
            <All99>
                 {/* Sidebar for displaying categories */}
                <Side>
                    <h1>Categories</h1>
                    {/* Render All Items category */}
                    <Sidebarval onClick={() => handleClick("All Items")} key={100}>All Items</Sidebarval>
                    {/* Render each category */}
                    {cat && cat.map((val) => (
                        <Sidebarval onClick={() => handleClick(val.name)} key={val.categoryId}>{val.name}</Sidebarval>
                    ))}
                </Side>
                {/* Main content area for displaying products */}
                <Cont1>
                    <h1>Category: {actcate === "All Items" ? "All Items" : cat.find(category => category.categoryId === actcate)?.name}</h1>
                 {/* Render products */}
                    <Cards>
                        {prod.length > 0 ? (
                            prod.map((product) => (
                                <Card30 key={product.productId}>
                                    <Img20>
                                        <Actual111 src={product.image}></Actual111>
                                    </Img20>
                                    <h3 style={{ marginTop: 2 }}>{product.name}</h3>
                                    <h5 style={{ marginTop: -6 }}>Rs. {product.price}</h5>
                                    <h5 style={{ marginTop: -6 }}>Ratings: {product.ratings}/5</h5>
                                    {/* Render Add To Cart button or quantity*/}
                                    {cart.some(item => item.product.productId === product.productId) ? (
                                        <QuantityControl>
                                            <button onClick={() => handleAddToCart(product.productId, -1)}>-</button>
                                            <span>{cart.find(item => item.product.productId === product.productId).quantity}</span>{/* Display quantity */}
                                            <button onClick={() => handleAddToCart(product.productId, 1)}>+</button>
                                        </QuantityControl>
                                    ) : (
                                       
                                        <Btn44 onClick={() => handleAddToCart(product.productId, 1)}>Add To Cart</Btn44> // Button to add product to cart
                                    )}
                                </Card30>
                            ))
                        ) : (
                            // Message for no products found
                            <p>No products found</p>
                        )}
                    </Cards>
                     {/* Pagination */}
                    <Rect>
                        {Array.from({ length: nopages }, (_, i) => i + 1).map((page) => (
                            <Smallrect key={page} act={actpge === page ? 1 : 0} onClick={() => {console.log('Clicked page:', page);setActpge(page)}}>
                                {page}
                            </Smallrect>
                        ))}
                    </Rect>
                </Cont1>
            </All99>
            {/* Popup message */}
            {showPopup && <Popup>{popupMessage}</Popup>}
        </>
    );
}

// Styled components for styling the UI elements
const Btn44 = styled.button`
    border: 1px solid black;
    &:hover {
        cursor: pointer;
        background-color: #BDC361;
    }
    font-size: medium;
    font-weight: 500;
`;

const Actual111 = styled.img`
    width: 100%;
    height: 100%;
`;

const Img20 = styled.div`
    width: 100%;
    height: 140px;
    border-radius: 5px;
`;

const Smallrect = styled.div`
    width: 28px;
    height: 100%;
    background-color: ${prop => prop.act ? "#BDC361" : "#F6F6F6"};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    &:hover {
        cursor: pointer;
    }
`;

const Rect = styled.div`
    width: 500px;
    background-color: white;
    height: 30px;
    margin-left: 200px;
    margin-top: 30px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    height: 550px;
    padding-left: 20px;
`;

const Sidebarval = styled.h3`
    &:hover {
        cursor: pointer;
        background-color: #b2b1b1;
        transition: 0.3s;
    }
    width: 180px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

const Card30 = styled.div`
    width: 200px;
    height: 250px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    &:hover {
        transform: translateY(-10px);
    }
`;

const All99 = styled.div`
    width: 100%;
    height: 700px;
    background-color: white;
    display: flex;
`;

const Side = styled.div`
    width: 20%;
    height: 100%;
    background-color: white;
    padding-left: 20px;
`;

const Cont1 = styled.div`
    width: 80%;
    height: 100%;
    background-color: white;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
    button {
        width: 30px;
        height: 30px;
        font-size: 18px;
        font-weight: bold;
        background-color: #BDC361;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    
    span {
        font-size: 16px;
        font-weight: bold;
    }
`;

const Popup = styled.div`
    position: fixed;
    top: 50px;
    right: 20px;
    background-color: #BDC361;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

export default Home;
