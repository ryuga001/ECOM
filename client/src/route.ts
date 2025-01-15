import axios from 'axios';
import { LoginInputType, ReviewFormDataType, shippingInfoDataType } from './types/alltypes';
import { allProductsResponseType, categoriesResponseType } from './types/api_types';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create axios instance
const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Get categories
export const getCategories = async (): Promise<categoriesResponseType> => {
    try {
        const response = await api.get('/product/all/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get products with filters
export const getProducts = async (categoryName: string, searchKeyword: string, currentPage: number): Promise<allProductsResponseType> => {
    try {
        const response = await api.get(`/product/allProducts`, {
            params: {
                category: categoryName !== 'All' ? categoryName : '',
                keyword: searchKeyword,
                page: currentPage,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Register a new user
export const registerUser = async (formData: FormData): Promise<any> => {
    try {
        const response = await api.post('/user/register', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Login a user
export const loginUser = async (formData: LoginInputType): Promise<any> => {
    try {
        const response = await api.post('/user/login', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Logout a user
export const logoutUser = async (): Promise<any> => {
    try {
        const response = await api.get('/user/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get current user details
export const getCurrentUser = async (): Promise<any> => {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get a single product by ID
export const getProductById = async (id: string = ""): Promise<any> => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Send a product review
export const sendReviewData = async (reviewData: ReviewFormDataType): Promise<any> => {
    try {
        const response = await api.put('/product/review', {
            rating: reviewData.rate,
            comment: reviewData.comment,
            productId: reviewData.pid,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a product review
export const deleteReviewData = async (id: string | undefined, reviewId: string): Promise<any> => {
    try {
        const response = await api.delete(`/product/reviews/${id}/${reviewId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Place an order
export const placeOrderData = async (shippingData: shippingInfoDataType): Promise<any> => {
    try {
        const response = await api.post('/order/new', shippingData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get all orders for the current user
export const getMyOrders = async (): Promise<any> => {
    try {
        const response = await api.get('/order/orders/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get all users (Admin only)
export const getAdminCustomers = async (): Promise<any> => {
    try {
        const response = await api.get('/user/admin/users');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAdminOrders = async (): Promise<any> => {
    try {
        const response = await api.get('/order/admin/orders');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAdminAnalytics = async (): Promise<any> => {
    try {
        const response = await api.get('/admin/analytics');
        return response;
    } catch (error) {
        throw error;
    }
};
export const getAdminProducts = async (): Promise<any> => {
    try {
        const response = await api.get('/product/admin/products');
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAdminProductDelete = async (id: string): Promise<any> => {
    try {
        const response = await api.delete(`/product/admin/product/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getAdminAddProduct = async (productData: FormData): Promise<any> => {
    try {
        const response = await api.post('/product/admin/product/new', productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
