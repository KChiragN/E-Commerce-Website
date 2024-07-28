import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Base URL of your Spring Boot backend

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/register', userData);
    return response.data; // Return the registered user data
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};

// Function to authenticate a user
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users/login', userData);
    return response.data; // Return the authenticated user data
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};

// Function to fetch products
export const getProducts = async ({ page, size, category = null }) => {
  try {
    const params = { page, size };
    if (category !== null) {
      params.category = category;
    }
    const response = await axiosInstance.get('/products', {
      params
    });
    return response.data; // Return the fetched products
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};
// Function to fetch categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data; // Return the fetched categories
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};
export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}/products`);
    return response.data; // Return the fetched products
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};
export const addToCart = async (requestData) => {
  try {
    const response = await axiosInstance.post(`/cart`, requestData );
    return response.data; // Return the updated cart data
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};
// New function to update cart quantity using PATCH request
export const updateCartQuantity = async (cartId, quantity) => {
  try {
    const response = await axiosInstance.patch(`/cart/${cartId}`, { quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCartItems = async () => {
  try {
      const response = await axiosInstance.get('/cart'); // Endpoint to fetch all cart items
      return response.data; // Return the cart items data from the response
  } catch (error) {
      throw error; // Throw the error for handling in the caller function
  }
};
export const deleteCartItem = async (id) => {
  try {
      await axiosInstance.delete(`/cart/${id}`);
      console.log(`Item with ID ${id} deleted successfully`);
  } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error; // Throw error for handling in the caller function
  }
};
export const getMostRecentUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data; // Return the most recent user ID
  } catch (error) {
    throw error; // Throw error for handling in the caller function
  }
};
export const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get(`/products/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
export const insertOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error inserting order:', error);
    throw error;
  }
};
export const getCartItemsByUserId = async (userId) => {
  try {
      const response = await axiosInstance.get(`/cart/users/${userId}`); // Use the endpoint to fetch cart items by user ID
      return response.data; // Return the cart items data from the response
  } catch (error) {
      throw error; // Throw the error for handling in the caller function
  }
};








