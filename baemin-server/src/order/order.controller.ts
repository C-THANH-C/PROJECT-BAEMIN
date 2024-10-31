import { lastValueFrom } from 'rxjs';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { PrismaClient } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
// import { OrderDto } from './dto';
@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    @Inject("ORDER_NAME") private Order: ClientProxy,
    @Inject("PRODUCT_NAME") private Product: ClientProxy
  ) { }

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

  @Delete('/delete-order/:id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(+id)
  }

  //ORDER SERVICE 
  @Get("/get-all-order-service")
  async getAllOrderService() {
    let getAllOrder = await this.Order.send("get-all-order", "")
    return getAllOrder
  }

  @UseGuards(AuthGuard)
  @Post("/post-order-service")
  async postOrderService(@Body() body: JSON, @Request() res) {
    let user_id = res.user.user_id
    let postOrder = await this.Order.send("post-order", { body, user_id })
    return postOrder
  }

  @UseGuards(AuthGuard)
  @Patch("/update-order/:id")
  async updateOrder(@Request() res, @Param("id") order_id: number) {
    let user_id = res.user.user_id
    let updateOrder = await lastValueFrom(this.Order.send("update-order", { user_id, order_id }))
    return updateOrder
  }

}

