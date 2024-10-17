import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
// import { orderProduct } from '../dto';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) { }
  @Get("/get-all-order-product")
  getAllOrderProduct() {
    return this.orderProductService.getAllOrderProduct();
  }

}
