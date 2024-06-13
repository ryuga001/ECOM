export interface ImageBannerProps {

    title: string;
    description: string;
}

export interface itemType {
    id: string,
    name: string,
    description: string,
    ratings: number,
    price: number,
    imgUrl?: string,
    category: string,
}

export interface ProductPropsType {
    pid?: string,
    name?: string,
    imgUrl?: string,
    price?: number,
    ratings: number,
}


interface imgaeType {
    imageId: string,
    url: string,
    _id: string,
}

export interface SliderType {
    images: Array<imgaeType>
}
export interface ProductTypeCartPage {
    id: string,
    name: string,
    quantity: number,
    price: number,
    imgUrl: string,

}

export interface LoginPageFormDataType {
    username: string,
    email: string,
    password: string,
    gender: string,
}