export interface AnalyticsDataType {
    totalProduct: number;
    totalCustomer: number;
    totalSales: number;
    Categories: Array<string>;
    CategoriesData: Array<number>;
    Male: number;
    Female: number;
    EachMonthData: Array<number>;
}

export interface formDataTypeProduct {
    name: string;
    description: string;
    stock: number;
    category: string;
    price: number;
}