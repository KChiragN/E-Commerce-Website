import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { insertOrder, getMostRecentUserId } from '../../services/axios-service';

// Calculate total price of cart items
const Payment = ({ cartItems, setPayment1, setCartPage1, shippingCost, setOrderConfirmation1, userId }) => {
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.quantity * item.product.price;
    }, 0);

// Log shipping cost to console on mount
    useEffect(() => {
        console.log('Shipping Cost Received:', shippingCost);
    }, [shippingCost]);

// State variables to manage tax, user inputs, and validation errors
    const [tax, setTax] = useState(5);
    const [taxVal, setTaxVal] = useState(Number((totalPrice * (tax / 100)).toFixed(2)));
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const countries = ["INDIA", "USA"];
    const states = [
        { count: "INDIA", state: "KARNATAKA" },
        { count: "INDIA", state: "MAHARASHTRA" },
        { count: "INDIA", state: "GOA" },
        { count: "INDIA", state: "TAMILNADU" },
        { count: "USA", state: "TEXAS" },
        { count: "USA", state: "NEWYORK" }
    ];
    const [selectedCountry, setSelectedCountry] = useState("INDIA");

    // Function to validate user inputs
    const validateInputs = () => {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            errors.email = 'Invalid email address';
        }

        if (!lastName) errors.lastName = 'Last name is required';
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!pincode) {
            errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(pincode)) {
            errors.pincode = 'Invalid pincode';
        }
        return errors;
    };
   
    // Function to handle shipping process
    const handleShipping = async (event) => {
        event.preventDefault();
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
     // Prepare order data
        const orderData = {
            user_id: {
                userId: userId,
                username: ""
            },
            orderDate: new Date().toISOString(),
            totalAmount: totalPrice + taxVal + shippingCost,
            city: city,
            pincode: pincode
        };

        try {
       // Insert order and navigate to order confirmation page
            await insertOrder(orderData);
            setPayment1(false);
            setOrderConfirmation1(true);

        } catch (error) {
            console.error('Error inserting order:', error);
        }
    };

    // Function to clear validation errors when inputs are changed
    const clearValidationErrors = () => {
        setValidationErrors({});
    };

    return (
        <>
        {/* Payment form container */}
            <All24>
                {/* Left section for shipping information */}
                <Left>
                    <form onSubmit={handleShipping}>
                        {/* Cart information header */}
                        <p>Cart {'>'} Information {'>'} Shipping {'>'} Payment</p>
                        {/* Contact information */}
                        <Hed>
                            <h2 style={{ margin: "5px" }}>Contact information</h2>
                        </Hed>
                        <Input1
                            type="text"
                            placeholder='Email or mobile phone number'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); clearValidationErrors(); }}
                        />
                        {validationErrors.email && <ErrorText>{validationErrors.email}</ErrorText>}
                        {/* Checkbox for email notifications */}
                        <Inpcheck>
                            <input type="checkbox" />Email me with news and offers
                        </Inpcheck>
                        {/* Shipping address */}
                        <h2 style={{ margin: "5px" }}>Shipping address</h2>
                         {/* Country selection */}
                        <Select1 onChange={(e) => { setSelectedCountry(e.target.value); clearValidationErrors(); }}>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </Select1>
                        {/* First name and last name inputs */}
                        <Fname>
                            <Input2 type="text" placeholder='First name(optional)' />
                            <Input2
                                type="text"
                                placeholder='Last name'
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value); clearValidationErrors(); }}
                            />
                        </Fname>
                        {validationErrors.lastName && <ErrorText>{validationErrors.lastName}</ErrorText>}
                         {/* Address input */}
                        <Input1
                            type="text"
                            placeholder='Address'
                            value={address}
                            onChange={(e) => { setAddress(e.target.value); clearValidationErrors(); }}
                        />
                        {validationErrors.address && <ErrorText>{validationErrors.address}</ErrorText>}
                        <Input1 type="text" placeholder='Apartment, suit, etc.(optional)' />
                        {/* City, state, and pincode inputs */}
                        <City>
                            <Input3
                                type="text"
                                placeholder='City'
                                value={city}
                                onChange={(e) => { setCity(e.target.value); clearValidationErrors(); }}
                            />
                            {validationErrors.city && <ErrorText>{validationErrors.city}</ErrorText>}
                            <Select2>
                                {states.map((state1) => {
                                    if (state1.count === selectedCountry)
                                        return <option key={state1.state} value={state1.state}>{state1.state}</option>
                                })}
                            </Select2>
                            <Input3
                                type="text"
                                placeholder='PIN code'
                                value={pincode}
                                onChange={(e) => {
                                    setPincode(e.target.value);
                                    if (validationErrors.pincode) {
                                        setValidationErrors((prevErrors) => ({
                                            ...prevErrors,
                                            pincode: '' // Clear the pincode error when user starts typing
                                        }));
                                    }
                                }}
                            />
                            {validationErrors.pincode && <ErrorText>{validationErrors.pincode}</ErrorText>}
                        </City>
                        {/* Buttons for navigation */}
                        <Bt>
                            <h4 onClick={() => { setPayment1(false); setCartPage1(true); }}>{"<"} Return to cart</h4>
                            <Btn type="submit">Continue to shipping</Btn>
                        </Bt>
                    </form>
                </Left>
                {/* Right section for displaying cart items and total */}
                <Right>
                  {/* Display cart items */}
                    <Top>
                        {cartItems.map((item) => (
                            <CartItemContainer key={item.cartItemId}>
                                <CartItemDetails>
                                    <img src={item.product.image} alt={item.product.name} width={40} height={50} />
                                    <ProductName>{item.product.name}</ProductName>
                                    <ProductPrice>Rs{item.product.price}</ProductPrice>
                                    <Quantity>{item.quantity}</Quantity>
                                    <Total>Rs{item.quantity * item.product.price}</Total>
                                </CartItemDetails>
                            </CartItemContainer>
                        ))}
                    </Top>
                    <hr style={{ color: 'red', backgroundColor: 'red', height: 2 }} />
                    {/* Display subtotal, shipping, and taxes */}
                    <Mid style={{ marginTop: -30 }}>
                        <Ms>
                            <P4 style={{ fontWeight: "bold" }}>Subtotal</P4>
                            <h4>Rs {totalPrice}</h4>
                        </Ms>
                        <Ms>
                            <P4>Shipping</P4>
                            <p style={{ color: "gray" }}>{shippingCost}</p>
                        </Ms>
                        <Ms>
                            <P4>Estimated taxes</P4>
                            <h4>Rs {taxVal}</h4>
                        </Ms>
                    </Mid>
                    <hr />
                    {/* Display total amount */}
                    <Bot style={{ marginTop: -30 }}>
                        <h3>Total</h3>
                        <h2>Rs {totalPrice + taxVal + shippingCost}</h2>
                    </Bot>
                </Right>
            </All24>
        </>
    );
};

// Styled components for styling the UI elements
const ErrorText = styled.p`
    color: red;
    font-size: 0.9rem;
    margin: 5px 0;
`;

const All24 = styled.div`
    width: 100%;
    height: 530px;
    display: flex;
`;

const Right = styled.div`
    background-color: #f7f0f0;
    width: 27%;
    height: 400px;
    display: flex;
    flex-direction: column;
    padding-left: 80px;
    padding-right: 110px;
    padding-top: 25px;
    margin-right: 25px;
    margin-top: 30px;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Ms = styled.div`
    display: flex;
    justify-content: space-between;
`;

const P4 = styled.p`
    font-size: 1.07rem;
`;

const Mid = styled.div`
    display: flex;
    flex-direction: column;
`;

const Bot = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding-left: 80px;
`;

const Hed = styled.div`
    display: flex;
    gap: 100px;
`;

const Inpcheck = styled.div`
    display: flex;
    font-size: 1.05rem;
`;

const Fname = styled.div`
    display: flex;
    gap: 10px;
`;

const City = styled.div`
    display: flex;
    gap: 10px;
`;

const Bt = styled.div`
    display: flex;
    gap: 308px;
    align-items: center;
`;




const Input1 = styled.input`
    width: 550px;
    height: 33px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Select1 = styled.select`
    width: 556px;
    height: 38px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Input2 = styled.input`
    width: 267px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Input3 = styled.input`
    height: 30px;
    width: 174px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Select2 = styled.select`
    height: 35px;
    width: 177px;
    border-radius: 5px;
    border: 1px solid gray;
`;

const Btn = styled.button`
    height: 35px;
    width: 140px;
    background-color: black;
    color: white;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
    }
    border: none;
`;
const CartItemContainer = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const CartItemDetails = styled.div`
    display: flex;
    flex-direction: row; /* Display items in a row */
`;

const ProductName = styled.p`
    margin-right: 10px; /* Add spacing between items */
`;


const ProductPrice = styled.p`
    margin-right: 10px; /* Add spacing between items */
`;

const Quantity = styled.p`
    margin-right: 10px; /* Add spacing between items */
`;

const Total = styled.p`
    margin-right: 10px; /* Add spacing between items */
`;


export default Payment;
