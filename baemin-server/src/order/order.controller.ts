import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
// import { OrderDto } from './dto';
@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get("get-all-order")
  getAllOrder() {
    return this.orderService.getAllOrder();
  }

  @Get("/get-order-user")
  getOrderUser(@Query("user_id") user_id: number) {
    return this.orderService.getOrderUser(+user_id)
  }
  @Get("/get-order")
  getOrder(@Query("order_id") order_id: number) {
    return this.orderService.getOrder(+order_id)
  }
  @UseGuards(AuthGuard)
  @Post('/create-order')
  createOrder(@Body() body: JSON, @Request() res: any) {
    let user_id = res.user.user_id;
    return this.orderService.createOrder(body, user_id)
  }

  @UseGuards(AuthGuard)
  @Patch()



  @Delete('/delete-order/:id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(+id)
  }
}

