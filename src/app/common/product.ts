export class Product {
    name: string;
    slug: string;
    summary: string;
    content: string;
    unitPrice: number;
    unitInStock: number;
    productImages: string;
    brandId: number;
    categoryId: number;
    brand: JSON;
    category: JSON;
    isDisabled: boolean;
    createdAt: Date;
}
