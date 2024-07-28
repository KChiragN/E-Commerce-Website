import React from 'react';


const OrderConfirmation = ({setOrderConfirmation1,setslider1}) => {
  const handleBackToHome = () => {
    setOrderConfirmation1(false);
    setslider1(true); 
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thank you &#128522;</h1>
      <p style={styles.message}>Your order is placed successfully.</p>
      <button style={styles.button} onClick={handleBackToHome}>Back To Home</button>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: '2rem',
    color: '#4CAF50',
  },
  message: {
    fontSize: '1.2rem',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default OrderConfirmation;
