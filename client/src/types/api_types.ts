import { ProductSingleType } from "./alltypes";

export interface categoriesResponseType {
    success: boolean,
    data: Array<string>,
}
export interface productPostType {
    categoryName: string,
    searchKeyword: string,
    CurrentPage: number,
}

export interface allProductsResponseType {
    success: boolean,
    data: Array<ProductSingleType>,
    productsCount: number,
    filteredProductsCount: number,
    resultPerPage: number,
    filteredCount: number,
}

