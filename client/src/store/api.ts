import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInputType, ReviewFormDataType, shippingInfoDataType } from '../types/alltypes';
import { allProductsResponseType, categoriesResponseType, productPostType } from '../types/api_types';


export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1/",
        prepareHeaders(headers) {
            return headers;
        },
        credentials: "include",
    }),
    tagTypes: ["categories", "products", "orders"],
    endpoints: (builder) => ({
        getCategory: builder.query<categoriesResponseType, void>({
            query: () => 'product/all/categories',
            providesTags: ["categories"],
        }),
        getProducts: builder.query<allProductsResponseType, productPostType>({
            query: ({ categoryName, searchKeyword, CurrentPage }) => `/product/allProducts?` + (categoryName !== "All" ? `&category=${categoryName}` : "") + `&keyword=${searchKeyword}` + `&page=${CurrentPage}`
        }),
        registerUser: builder.mutation<any, FormData>({
            query: (FORMDATA) => ({
                url: "user/register",
                method: "POST",
                body: FORMDATA
            })
        }),
        loginUser: builder.mutation<any, LoginInputType>({
            query: (formData) => ({
                url: "user/login",
                method: "POST",
                body: formData
            })
        }),
        logoutUser: builder.query<any, any>({
            query: () => 'user/logout'
        }),

        getCurrentUser: builder.query<any, void>({
            query: () => ({
                url: 'user/me',

            })
        }),

        getProduct: builder.query<any, any>({
            query: (id) => `product/${id}`
        }),
        sendReview: builder.mutation<any, ReviewFormDataType>({
            query: (reviewFormData) => ({
                url: 'product/review',
                method: "PUT",
                body: {
                    rating: reviewFormData.rate,
                    comment: reviewFormData.comment,
                    productId: reviewFormData.pid,
                }
            })
        }),
        deleteReivew: builder.mutation<any, any>({
            query: ({ id, reviewId }) => ({
                url: `product/reviews/${id}/${reviewId}`,
                method: "DELETE",
            })
        }),
        placeOrder: builder.mutation<any, shippingInfoDataType>({
            query: (shippingData) => ({
                url: 'order/new',
                method: "POST",
                body: shippingData
            })
        }),
        // error 
        getMyOrders: builder.query<any, void>({
            query: () => ({
                url: "order/orders/me",
            })
        }),
        // admin-api
        getAdminCustomers: builder.query<any, void>({
            query: () => "user/admin/users"
        })
    })
})

export const { useGetCategoryQuery, useGetProductsQuery, useRegisterUserMutation, useLoginUserMutation, useGetCurrentUserQuery, useGetProductQuery, useSendReviewMutation, useDeleteReivewMutation, usePlaceOrderMutation, useLogoutUserQuery, useGetMyOrdersQuery, useGetAdminCustomersQuery } = API 