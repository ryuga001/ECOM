interface OrderItemType {
    name: string,
    price: number,
    quantity: number,
    imageUrl: string,
    product: string,

}
interface paymentInfoType {
    id: string,
    status: string,
}
export interface OrderDataType {
    id: string,
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: number,
    phoneNo: number,
    orderedItems: Array<OrderItemType>,
    user: string,
    paymentInfo: paymentInfoType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: string,
    shippingInfo: shippingDataType
}



//shipping 
export interface OrderItemTypeShipping {
    name: string,
    price: number,
    quantity: number,
    image: string,
    product: string,
    _id?: string,
}

export interface shippingDataType {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string,
    phoneNo: string,
    orderedItems: Array<OrderItemTypeShipping>,
    user: string,
    paymentInfo: paymentInfoType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: string,
}

// productDescription 

export interface ReviewFormDataType {
    comment: string,
    rate: string,
    pid?: string,
}

interface ImageArrayType {
    imageId: string,
    url: string,
}

export interface ProductSingleType {
    _id: string,
    name: string,
    description: string,
    price: number,
    ratings: number,
    images: Array<ImageArrayType>,
    category: string,
    stock: number,
    reviews: Array<any>,
    numOfReviews: number,
    user: string,
}
// userSlice 

export interface UserDataType {
    id: string,
    username: string,
    email: string,
    profileImage: string,
    role?: string,

}
export interface UserType {
    user: UserDataType,
}

export interface LoginInputType {
    email: string,
    password: string,
}

export interface shippingInfoDataType {
    shippingInfo: {
        address: string,
        city: string,
        state: string,
        country: string,
        pinCode: string,
        phoneNo: string,
    },
    orderItems: Array<OrderItemTypeShipping>,
    paymentInfo: paymentInfoType,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
}