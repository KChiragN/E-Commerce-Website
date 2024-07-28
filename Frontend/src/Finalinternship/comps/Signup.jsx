import React, { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../../services/axios-service';

function Signup() {
  // State variables to store user inputs and validation errors
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(""); // New state for registration status
  const [validationErrors, setValidationErrors] = useState({});

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to validate password length
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle the signup process
  const handleSignup = async () => {
    let errors = {};

  // Validate user inputs
    if (!fname.trim()) {
      errors.fname = 'First name is required.';
    }

    if (!lname.trim()) {
      errors.lname = 'Last name is required.';
    }

    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 6 characters long.';
    }

  // If there are validation errors, set them in state and return early
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

   // If inputs are valid, attempt to register the user
    try {
      const userData = {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password
      };
      const response = await registerUser(userData);
      console.log('User registered:', response.data);
      setRegistrationStatus("Registration successful!");// Set success message
      window.location.href = '/login';  // Redirect to login page on success
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationStatus("Email Id already exists. Please Login."); // Set error message
    }
  };

   // Handlers to update state and clear validation errors when inputs change
  const handleFnameChange = (e) => {
    setFname(e.target.value);
    if (validationErrors.fname && e.target.value.trim()) {
      setValidationErrors(prevErrors => ({ ...prevErrors, fname: null }));
    }
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
    if (validationErrors.lname && e.target.value.trim()) {
      setValidationErrors(prevErrors => ({ ...prevErrors, lname: null }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validationErrors.email && validateEmail(e.target.value)) {
      setValidationErrors(prevErrors => ({ ...prevErrors, email: null }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (validationErrors.password && validatePassword(e.target.value)) {
      setValidationErrors(prevErrors => ({ ...prevErrors, password: null }));
    }
  };

  return (
    <All61>
      <h2>Create Account</h2>
      
      {/* Input fields for first name, last name, email, and password */}<p style={{ marginTop: "-15px" }}>Please register using your account detail below</p>
      <Pa>First Name</Pa>
      <I
        placeholder="First Name"
        value={fname}
        onChange={handleFnameChange}
      />
      {validationErrors.fname && <ErrorMessage>{validationErrors.fname}</ErrorMessage>}
      <Pa>Last Name</Pa>
      <I
        placeholder="Last Name"
        value={lname}
        onChange={handleLnameChange}
      />
      {validationErrors.lname && <ErrorMessage>{validationErrors.lname}</ErrorMessage>}
      <Pa>Email</Pa>
      <I
        placeholder="Email"
        type='email'
        value={email}
        onChange={handleEmailChange}
      />
      {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
      <Pa>Password</Pa>
      <I
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {validationErrors.password && <ErrorMessage>{validationErrors.password}</ErrorMessage>}
      {/* Button to trigger signup process */}
      <Btn201 onClick={handleSignup}>CREATE</Btn201>
      {/* Display registration status */}
      {registrationStatus && <p>{registrationStatus}</p>} {/* Display registration status */}
    </All61>
  )
}

// Styled components for styling the UI elements 
const Btn201 = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  background-color: #BDC361;
  color: white;
  margin-top: 10px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Pa = styled.p`
  margin-left: -240px;
`;

const I = styled.input`
  height: 30px;
  width: 300px;
  margin-top: -10px;
  border: none;
  padding-left: 5px;
  border-radius: 3px;
`;

const All61 = styled.div`
  height: 480px;
  background-color: #F3F3F3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0px;
`;

export default Signup;
