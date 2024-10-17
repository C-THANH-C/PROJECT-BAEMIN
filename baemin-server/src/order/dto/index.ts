import { Type } from "class-transformer";

class orderProduct {
    product_id: number;
    order_price: number;
    order_quantity: number;
}
export class OrderDto {
    user_id: number;
    order_create: Date;
    @Type(() => orderProduct)
    order_product: orderProduct[];
}