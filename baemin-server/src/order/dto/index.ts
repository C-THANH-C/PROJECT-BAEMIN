import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";

class orderProduct {
    @ApiProperty()
    product_id: number;
    @ApiProperty()
    order_price: number;
    @ApiProperty()
    order_quantity: number;
}
export class OrderDto {
    @ApiProperty()
    user_id: number;
    @ApiProperty()
    order_create: Date;
    @ApiProperty()
    @Type(() => orderProduct)
    order_product: orderProduct[];
}