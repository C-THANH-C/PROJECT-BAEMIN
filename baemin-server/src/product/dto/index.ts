import { IsArray, IsOptional } from "class-validator";

export class CreateProduct {
    product_name: string;
    store_id: number;
    category_id: number;
    product_image: any[];
    product_price: number;
    product_quantity: number;
    product_description: string;
    product_create: Date;
}
export class PutProduct {
    product_name: string;
    store_id: number;
    category_id: number;
    product_price: number;
    product_quantity: number;
    product_description: string;
    product_create: Date;
    @IsArray()
    @IsOptional()
    product_image: any[];
}