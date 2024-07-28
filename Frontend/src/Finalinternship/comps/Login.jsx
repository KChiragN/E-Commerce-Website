import React, { useState } from 'react';
import styled from 'styled-components';
import { loginUser } from '../../services/axios-service';

// Login component accepts several state-setting functions as props
function Login({ setUserId, setslider1, setSignup1, setLogin101, setHome1, setCartpage1, setShipping1, setPayment1, setAbout1, setOrderConfirmation1 }) {
    // State variables to store user inputs and other states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

   // Function to validate password length
    const validatePassword = (password) => {
        return password.length >= 6;
    };
   // Handle the login process
    const handleLogin = async () => {
        let errors = {};
        // Validate email and password
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

     // If inputs are valid, attempt to log in the user
        try {
            const response = await loginUser({
                email: email,
                password: password
            });
            console.log('Login successful:', response);
            setUserId(response.userId);
            setLoginSuccess(true);
            setLogoutSuccess(false);
            setLoginError(null); // Clear any previous login error
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Login unsuccessful. Please check your credentials.');
            setLoginSuccess(false);
            setLogoutSuccess(false); // Ensure loginSuccess is set to false
        }
    };

   // Handlers to update state and clear validation errors when inputs change
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
   
    // Handle the logout process
    const handleLogout = () => {
        setUserId(null);
        setEmail(""); 
        setPassword(""); 
        setLogin101(true);
        setHome1(false);
        setslider1(false);
        setSignup1(false);
        setCartpage1(false);
        setShipping1(false);
        setPayment1(false);
        setAbout1(false);
        setOrderConfirmation1(false);
        setLoginSuccess(false); // Ensure loginSuccess is set to false on logout
        setValidationErrors({}); // Clear validation errors
        setLoginError(null); 
        setLogoutSuccess(true);
    };

    return (
        <>
         {/* Login form */}
            <All60>
                <h2>LOGIN</h2>
                <p>Please login using account detail below</p>
                <Box>
                    {/* Email input */}
                    <Inpu
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
                    <br /><br />
                    {/* Password input */}
                    <Inpu
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {validationErrors.password && <ErrorMessage>{validationErrors.password}</ErrorMessage>}
                    <br /><br />
                    {/* Login and logout buttons */}
                    <ButtonContainer>
                        <Btn20 onClick={handleLogin}>SIGN IN</Btn20>
                        {loginSuccess && (
                            <Btn20 onClick={handleLogout}>LOGOUT</Btn20>
                        )}
                    </ButtonContainer>
                    {/* Error messages */}
                    {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
                    {loginSuccess && !loginError && <SuccessMessage>Login successful</SuccessMessage>}
                    {logoutSuccess && <SuccessMessage>Logout successful</SuccessMessage>}
                    {/* Link to create account */}
                    <p onClick={() => {
                        setHome1(false);
                        setslider1(false);
                        setAbout1(false);
                        setPayment1(false);
                        setSignup1(true);
                        setLogin101(false);
                        setCartpage1(false);
                        setShipping1(false);
                        setOrderConfirmation1(false);
                    }}>Create Account</p>
                </Box>
            </All60>
        </>
    );
}

// Styled components for styling the UI elements 
const Btn20 = styled.button`
    width: 80px;
    height: 30px;
    border: none;
    background-color: #BDC361;
    color: white;
    cursor: pointer;
    margin: 0 5px;
`;

const Inpu = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 3px;
    border: 1px solid grey;
    padding-left: 10px;
`;

const Box = styled.div`
    width: 300px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    padding: 40px;
`;

const All60 = styled.div`
    height: 500px;
    background-color: #F3F3F3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ErrorMessage = styled.p`
    color: red;
    margin: 1px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
const SuccessMessage = styled.p`
    color: green;
    margin: 1px;
`;


export default Login;
