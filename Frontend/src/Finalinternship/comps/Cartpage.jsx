import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCartItemsByUserId } from '../../services/axios-service';
 // Import the function to fetch cart items

function Cartpage({userId, onTotalPriceChange }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch cart items when the component mounts
        if (userId) {
            fetchCartItems(userId);
        }
    }, [userId]);

    // Function to fetch cart items
    const fetchCartItems = async (userId) => {
        try {
            const response = await getCartItemsByUserId(userId); // Replace this with your actual function to fetch cart items
            setCartItems(response); // Set the cart items in the state
            calculateTotalPrice(response); // Calculate total price
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    // Function to calculate the total price of a product
    const calculateTotal = (price, quantity) => price * quantity;

    // Function to calculate total price of all items in cart
    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            total += calculateTotal(item.product.price, item.quantity);
        });
        setTotalPrice(total);
        // Pass total price to parent component
        onTotalPriceChange(total,items);
    };

    return (
        <CartContainer>
            {/* Cart title and navigation */}
            <h1>Your Shopping Cart</h1>
            <h4>Home &gt; Your Shopping Cart</h4>
             {/* Cart content */}
            <CartContent>
                {/* Cart table header */}
                <CartHeader>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total</div>
                </CartHeader>
                 {/* Cart items */}
                <CartItems>
                    {cartItems.map(item => (
                        <CartItem key={item.id}>
                             {/* Product information */}
                            <ProductInfo>
                                <img src={item.product.image} alt={item.product.name} width={50} />
                                <h5>{item.product.name}</h5>
                            </ProductInfo>
                            {/* Price */}
                            <div>{item.product.price}</div>
                            {/* Quantity */}
                            <div>{item.quantity}</div>
                             {/* Total price */}
                            <div>{calculateTotal(item.product.price, item.quantity)}</div>
                        </CartItem>
                    ))}
                </CartItems>
                {/* Total price */}
                <TotalPrice>Total Price: {totalPrice}</TotalPrice>
            </CartContent>
        </CartContainer>
    );
}

// Styled components...

const CartContainer = styled.div`
    min-height: 500px;
    background-image: url("https://th.bing.com/th/id/OIP.qYQE4mUiJP5QumA_KCnqhQHaFP?rs=1&pid=ImgDetMain");
    background-attachment: scroll;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: center;
    justify-content: center;
`;

const CartContent = styled.div`
    background-color: white;
    min-height: 360px;
    width: 100%;
    padding: 20px;
`;

const CartHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    color: black;
    padding: 10px 0;
    border-bottom: 2px solid #ddd;
    text-align: center; /* Center align the text in the header */
`;

const CartItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const CartItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    color: black;
    text-align: center;
    font-weight: bold; /* Center align the text in each grid cell */
`;

const ProductInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; /* Increase gap for better spacing */
    justify-content: flex-start;
    font-weight: bold; /* Align product info to the start */
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    font-weight: bold;
    color: black;
    font-size: 18px;
`;

export default Cartpage;