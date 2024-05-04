import { NextFunction, Request, Response } from "express"

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;


export interface NewUserRequestBody {
    username: string,
    email: string,
    password: string,
    avatar: string,
    gender: string,
    role: string,
}

export interface LoginUserRequestBody {
    email: string,
    password: string,
}

export interface AuthenticatedRequest extends Request {
    userId?: string,
}


// Products 

export interface ImagesTypeProduct {
    imageId?: string,
    url?: string,
}
// interface ReviewsTypeProduct {
//     user: string,
//     name: string,
//     comment: string,
// }

export interface RequestProductBody {
    name: string,
    description: string
    price: number,
    images: Array<ImagesTypeProduct>,
    category: string,
    stock: number,
}
export interface AuthenticatedProductRequest extends Request<{}, {}, RequestProductBody> {
    userId?: string,
}


export interface RequestReviewBody {
    rating: string | number,
    comment: string,
    productId: string,
}
export interface AuthenticatedRequestReview extends Request<{}, {}, RequestReviewBody> {
    userId?: string,
}

// order types 

export interface shippingInfoType {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string,
    phoneNo: number | string,
}

export interface orderItemsObjectType {
    name: string,
    price: number,
    quantity: number,
    image: string,
    product: string,
}

export interface paymentInfoObjectType {
    id: string,
    status: string,
}

export interface OrderRequestBody {
    shippingInfo: shippingInfoType,
    orderItems: Array<orderItemsObjectType>,
    paymentInfo: paymentInfoObjectType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
}

export interface AuthenticatedOrderRequest extends Request<{}, {}, OrderRequestBody> {
    userId?: string,
}