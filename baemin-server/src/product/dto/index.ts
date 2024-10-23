import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class CreateProduct {

    @ApiProperty()
    product_name: string;
    @ApiProperty()
    store_id: number;
    @ApiProperty()
    category_id: number;
    @ApiProperty()
    product_image: any[];
    @ApiProperty()
    product_price: number;
    @ApiProperty()
    product_quantity: number;
    @ApiProperty()
    product_description: string;
    @ApiProperty()
    product_create: Date;
}
export class PutProduct {
    @ApiProperty()
    product_name: string;
    @ApiProperty()
    store_id: number;
    @ApiProperty()
    category_id: number;
    @ApiProperty()
    product_price: number;
    @ApiProperty()
    product_quantity: number;
    @ApiProperty()
    product_description: string;
    @ApiProperty()
    product_create: Date;
    @IsArray()
    @IsOptional()
    product_image: any[];
}