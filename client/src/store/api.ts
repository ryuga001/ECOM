import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    LoginInputType,
    ReviewFormDataType,
    shippingInfoDataType,
} from '../types/alltypes';
import {
    productPostType
} from '../types/api_types';

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders(headers) {

            return headers;
        },
        credentials: 'include',
    }),
    tagTypes: ['categories', 'products', 'orders', 'users', 'reviews'],
    endpoints: (builder) => ({
        // Get all categories
        getCategory: builder.query<any, void>({
            query: () => '/product/all/categories',
            providesTags: ['categories'],
        }),

        // Get products with filters
        getProducts: builder.query<any, productPostType>({
            query: ({ categoryName, searchKeyword, CurrentPage }) =>
                `/product/allProducts?${categoryName !== 'All' ? `&category=${categoryName}` : ''
                }&keyword=${searchKeyword}&page=${CurrentPage}`,
            providesTags: ['products'],
        }),

        // Register a new user
        registerUser: builder.mutation<any, FormData>({
            query: (FORMDATA) => ({
                url: '/user/register',
                method: 'POST',
                body: FORMDATA,
            }),
            invalidatesTags: ['users'],
        }),

        // Login a user
        loginUser: builder.mutation<any, LoginInputType>({
            query: (formData) => ({
                url: '/user/login',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['users'],
        }),

        // Logout a user
        logoutUser: builder.mutation<any, void>({
            query: () => '/user/logout',

        }),

        // Get current user details
        getCurrentUser: builder.query<any, void>({
            query: () => ({ url: '/user/me' }),
            providesTags: ['users'],
        }),

        // Get a single product by ID
        getProduct: builder.query<any, string>({
            query: (id) => `/product/${id}`,

        }),

        // Send a product review
        sendReview: builder.mutation<any, ReviewFormDataType>({
            query: (reviewFormData) => ({
                url: '/product/review',
                method: 'PUT',
                body: {
                    rating: reviewFormData.rate,
                    comment: reviewFormData.comment,
                    productId: reviewFormData.pid,
                },
            }),
            invalidatesTags: ['products'],
        }),

        // Delete a product review
        deleteReview: builder.mutation<any, { id: string | undefined; reviewId: string }>({
            query: ({ id, reviewId }) => ({
                url: `/product/reviews/${id}/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['products'],
        }),

        // Place an order
        placeOrder: builder.mutation<any, shippingInfoDataType>({
            query: (shippingData) => ({
                url: '/order/new',
                method: 'POST',
                body: shippingData,
            }),
            invalidatesTags: ['orders'],
        }),

        // Get all orders for the current user
        getMyOrders: builder.query<any, void>({
            query: () => ({ url: '/order/orders/me' }),
            providesTags: ['orders'],
        }),

        // Admin APIs
        // Get all users (Admin only)
        getAdminCustomers: builder.query<any, void>({
            query: () => '/user/admin/users',

        }),
    }),
});


export const {
    useGetCategoryQuery,
    useGetProductsQuery,
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetCurrentUserQuery,
    useGetProductQuery,
    useSendReviewMutation,
    useDeleteReviewMutation,
    usePlaceOrderMutation,
    useGetMyOrdersQuery,
    useGetAdminCustomersQuery,
} = API;

