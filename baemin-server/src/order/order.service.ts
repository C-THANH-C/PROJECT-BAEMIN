
import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { sendMail } from 'src/config/sendMail';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';
// import { orderProduct } from './dto';
type orderProduct = {
    product_id: number;
    order_price: number;
    order_quantity: number;
}
@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }


    async getAllOrder() {
        let data = await this.prisma.order.findMany({
            include: {
                users: {
                    select: {
                        user_id: true,
                        email: true,
                        full_name: true,
                        phone: true,
                        address: true,
                        user_image: true
                    }
                },
                order_product: {
                    include: {
                        product: {
                            select: {
                                product_id: true,
                                product_name: true,
                                product_price: true,
                            }
                        }
                    }
                }
            }
        })
        return new Response<string>("200", "Get All Order", data)
    }
    async getOrderUser(user_id: number) {
        let data = await this.prisma.order.findMany({
            where: {
                user_id
            },
            include: {
                users: {
                    select: {
                        user_id: true,
                        email: true,
                        full_name: true,
                        phone: true,
                        address: true,
                        user_image: true
                    }
                },
                order_product: {
                    include: {
                        product: {
                            select: {
                                product_id: true,
                                product_name: true,
                                product_price: true,
                            }

                        }
                    }
                }
            }
        })
        if (data.length > 0)
            return new Response<string>("200", "Get user order", data)
        else {
            return new Response<string>("200", "User not", null)
        }
    }
    async getOrder(order_id: number) {
        let data = await this.prisma.order.findMany({
            where: {
                order_id
            },
            include: {
                users: {
                    select: {
                        user_id: true,
                        email: true,
                        full_name: true,
                        phone: true,
                        address: true,
                        user_image: true
                    }
                },
                order_product: {
                    include: {
                        product: {
                            select: {
                                product_id: true,
                                product_name: true,
                                product_price: true,
                            }

                        }
                    }
                }
            }
        })
        if (data.length > 0)
            return new Response<string>("200", `Get order ${order_id}`, data)
        else {
            return new Response<string>("200", "order not found", null)
        }
    }
    async createOrder(dto, user_id) {
        let newOrder = {
            ...dto,
            user_id,
            order_create: new Date()
        }
        let checkUser= await this.prisma.users.findFirst({
            where:{
                user_id
            }
        })
        let data = await this.prisma.order.create({
            data: {
                user_id: newOrder.user_id,
                order_create: newOrder.order_create,
                order_product: {
                    create: newOrder.order_product.map((product) => ({
                        product: { connect: { product_id: product.product_id } },
                        order_price: product.order_price,
                        order_quantity: product.order_quantity
                    }))
                }
            },
            include: {
                order_product: true,
            },
        })
        sendMail(checkUser.email,"Đặt hàng qua baemin","<h1>Xác nhận đơn hàng thành công</h1>")
        return new Response<string>("200", "order created", data)

    }

    async deleteOrder(order_id: number) {
        let checkOrder = await this.prisma.order.findFirst({
            where: {
                order_id
            }
        })
        if (checkOrder) {
            await this.prisma.order.delete({
                where: { order_id }
            })
            return new Response<string>("200", "Order delete", null)
        } else {
            return new Response<string>("400", "Order not found", null)
        }

    }
}
