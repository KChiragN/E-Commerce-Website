import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Shipping({ totalPrice, setShipping1, setPayment1, setShippingCost }) {
  const countries = ["INDIA", "USA"];
  const states = [
    { count: "INDIA", state: "KARNATAKA" },
    { count: "INDIA", state: "MAHARASHTRA" },
    { count: "INDIA", state: "GOA" },
    { count: "INDIA", state: "TAMILNADU" },
    { count: "USA", state: "TEXAS" },
    { count: "USA", state: "NEWYORK" },
  ];

  // State variables to manage form inputs and errors
  const [selectedCountry, setSelectedCountry] = useState("INDIA");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [shippingCost, setShippingCostLocal] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Helper function to check if the selected date is in the future
  const isFutureDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate > today;
  };

  // Helper function to validate the delivery time
  const isValidTime = (date, time) => {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
    if (!timePattern.test(time)) return false;
  
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
  
    if (dayOfWeek === 6) { // Saturday
      return (hours >= 8 && hours < 11 && minutes >= 0 && minutes <= 59)||(hours === 11 && minutes === 0);
    } else { // Weekdays (Monday to Friday)
      return (hours >= 12 && hours < 16 && minutes >= 0 && minutes <= 59)||(hours===16 && minutes===0);
    }
  };
  
  

  // Helper function to validate the ZIP/Postal code
  const isValidZipCode = (zip) => {
    const zipPattern = /^\d{6}$/;
    return zipPattern.test(zip);
  };

  // Function to validate all form inputs
  const validateForm = () => {
    let validationErrors = {};

    // Validate delivery date
    if (!deliveryDate) {
      validationErrors.deliveryDate = "Delivery date is required.";
    } else if (!isFutureDate(deliveryDate)) {
      validationErrors.deliveryDate = "Delivery date must be in the future.";
    }

    // Validate delivery time
    if (!deliveryTime) {
      validationErrors.deliveryTime = "Delivery time is required.";
    } else if (!isValidTime(deliveryDate, deliveryTime)) {
      validationErrors.deliveryTime = "Delivery time must be between 12:00-16:00 (MON-FRI) or 08:00-11:00 (SAT).";
    }

    // Validate ZIP/Postal code
    if (!zipCode) {
      validationErrors.zipCode = "ZIP/Postal code is required.";
    } else if (!isValidZipCode(zipCode)) {
      validationErrors.zipCode = "Invalid ZIP/Postal code.";
    }

    // Set errors
    setErrors(validationErrors);

    // Check if there are no validation errors
    setIsFormValid(Object.keys(validationErrors).length === 0);
  };

  // Function to calculate the shipping cost
  const calculateShipping = () => {
    validateForm();

    // Calculate shipping cost based on total price if form is valid
    if (isFormValid) {
      const newShippingCost = totalPrice <= 999 ? 49 : 0;
      setShippingCostLocal(newShippingCost);
      setShippingCost(newShippingCost); // Set shipping cost to parent component
    }
  };

  // Function to handle the proceeding to checkout
  const handleProceedToCheckout = () => {
    // If terms and conditions are not agreed, show error
    if (!agreeTerms) {
      setErrors({ agreeTerms: "You must agree with the terms and conditions." });
      return;
    }  
    // Validate the form
    validateForm();
    // If the form is valid, proceed to the next page
    if (isFormValid) {
      setShipping1(false);
      setPayment1(true);
    }
  };
  
  // Function to handle input change and clear errors
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
    switch (field) {
      case 'deliveryDate':
        setDeliveryDate(value);
        break;
      case 'deliveryTime':
        setDeliveryTime(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      default:
        break;
    }
    validateForm();
  };

  // Revalidate form whenever inputs change
  useEffect(() => {
    validateForm();
  }, [deliveryDate, deliveryTime, zipCode]);

  return (
    <>
      {/* Shipping form container */}
      <All23>
        {/* Left section for selecting delivery options */}
        <Left1>
          <h1>Pick a delivery date and time</h1>
          {/* Input fields for delivery date and time */}
          <Input3
            type="date"
            value={deliveryDate}
            onChange={(e) => handleInputChange(e, 'deliveryDate')}
          />
          {errors.deliveryDate && <ErrorMessage>{errors.deliveryDate}</ErrorMessage>}
          <Input3
            type="text"
            placeholder='Write delivery time (HH:MM)'
            value={deliveryTime}
            onChange={(e) => handleInputChange(e, 'deliveryTime')}
          />
          {errors.deliveryTime && <ErrorMessage>{errors.deliveryTime}</ErrorMessage>}
          <p>Pick a delivery date and time as you choose. Delivery time takes place between 12:00-16:00 (MON-FRI) and 08:00-11:00 (SAT)</p>
          {/* Input fields for country, state, and ZIP/Postal code */}
          <h1>Get Shipping Estimates</h1>
          <Select onChange={(e) => setSelectedCountry(e.target.value)}>
            {countries.map((country) => (
              <option value={country} key={country}>{country}</option>
            ))}
          </Select>
          <Select>
            {states.filter(state => state.count === selectedCountry).map((state1) => (
              <option value={state1.state} key={state1.state}>{state1.state}</option>
            ))}
          </Select>
          <Input3
            type="text"
            placeholder='ZIP/Postal Code'
            value={zipCode}
            onChange={(e) => handleInputChange(e, 'zipCode')}
          />
          {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
          {/* Button to calculate shipping cost */}
          <Button onClick={calculateShipping}>CALCULATE SHIPPING</Button>
          {/* Display shipping cost if calculated */}
          {shippingCost !== null && (
            <p>Shipping Cost: Rs {shippingCost}</p>
          )}
        </Left1>
        {/* Right section for displaying cart totals and agreement checkbox */}
        <Right1>
          <h1 style={{ marginLeft: "120px" }}>CART TOTALS</h1>
          {/* Display subtotal and total amount */}
          <Amt>
            <Amt1>
              <h3>SUBTOTAL</h3>
              <h3>Rs {totalPrice}</h3>
            </Amt1>
            <Amt1>
              <h3>TOTAL</h3>
              <h3>Rs {totalPrice}</h3>
            </Amt1>
          </Amt>
          {/* Agreement checkbox */}
          <Inpcheck style={{ marginLeft: "110px" }}>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => {
                setAgreeTerms(!agreeTerms);
                if (errors.agreeTerms) {
                  setErrors((prevErrors) => ({ ...prevErrors, agreeTerms: null }));
                }
              }}
            />
            I agree with the terms and conditions
          </Inpcheck>
          {/* Display error if terms and conditions are not agreed */}
          {errors.agreeTerms && <ErrorMessage>{errors.agreeTerms}</ErrorMessage>}
          {/* Button to proceed to checkout */}
          <Button2 onClick={handleProceedToCheckout} disabled={!isFormValid || !agreeTerms}>PROCEED TO CHECKOUT</Button2>
        </Right1>
      </All23>
    </>
  );
}
// Styled components for styling the UI elements 

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0px;
`;

const Inpcheck = styled.div`
  display: flex;
  font-size: 1.3rem;
  font-weight: 500;
`;

const All23 = styled.div`
  width: 100%;
  height: 550px;
  display: flex;
`;

const Left1 = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-left: 60px;
  padding-right: 30px;
`;

const Input3 = styled.input`
  width: 300px;
  height: 60px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Select = styled.select`
  width: 50%;
  height: 55px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Button = styled.button`
  width: 50%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 10px;
  background-color: #BDC361;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Right1 = styled.div`
  background-color: #f0e9e9;
  width: 35%;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 20px;
  margin-right: 60px;
  padding: 40px;
  border-radius: 5px;
`;

const Amt = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amt1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button2 = styled.button`
  width: 60%;
  height: 40px;
  margin: 30px;
  margin-left: 115px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: #f95873;
  color: white;
  &:hover {
    cursor: pointer;
  }
  
`;

export default Shipping;
