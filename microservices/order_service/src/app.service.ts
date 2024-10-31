import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from './response';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService,
    @Inject("PRODUCT_NAME") private Product: ClientProxy
  ) {
  }
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
  async postOrder(data) {
    let dto = data.body;
    let { user_id } = data

    let product_id = (await dto.order_product.map((product) => {
      return product.product_id
    }))
    let checkProduct = await this.prisma.product.findMany({
      where: {
        product_id: {
          in: product_id
        }
      }
    })
    let existingProduct = new Set(checkProduct.map((product) => product.product_id));
    let missingProducts = dto.order_product.filter(
      (product) => !existingProduct.has(product.product_id)
    );
    if (missingProducts.length > 0) {
      return new Response<string>("400", "Some products are missing", missingProducts);
    }
    let quantityProduct = dto.order_product.filter(orderProduct => {
      let foundProduct = checkProduct.find(product => product.product_id === orderProduct.product_id)
      return foundProduct && foundProduct.product_quantity < orderProduct.order_quantity
    })
    if (quantityProduct.length > 0) {
      let checkQuantityProduct = quantityProduct.map(orderProduct => {
        let foundProduct = checkProduct.find(product => product.product_id === orderProduct.product_id);
        return {
          product_id: orderProduct.product_id,
          order_quantity: orderProduct.order_quantity,
          max_order_quantity: foundProduct ? foundProduct.product_quantity : 0
        };
      });
      return new Response<string>("400", "Some products have insufficient stock", checkQuantityProduct);
    }
    let order_product = await dto.order_product.map(orderProduct => {
      let foundProduct = checkProduct.find(product => product.product_id === orderProduct.product_id);
      return {
        product_id: orderProduct.product_id,
        order_quantity: orderProduct.order_quantity,
        order_price: orderProduct.order_quantity * foundProduct.product_price
      }
    }
    )
    let newOrder = {
      ...dto,
      user_id,
      order_create: new Date(),
      order_product
    }

    let dataOrder = await this.prisma.order.create({
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
    return new Response<string>("200", "order created", dataOrder)
  }
  async updateOrder({ user_id, order_id }) {
    let checkOrder = await this.prisma.order.findFirst({
      where: {
        AND: [
          { user_id },
          { order_id: +order_id },
        ],
      },
      include: {
        users: {
          select: {
            user_id: true,
            email: true,
            full_name: true,
            phone: true,
          }
        },
        order_product: {
          include: {
            product: {
              select: {
                product_id: true,
                product_name: true,
                product_price: true,
                product_quantity: true
              }
            }
          }
        }
      }
    })
    if (!checkOrder) return new Response<string>("400", "Order not found", checkOrder)
    try {
      if (!checkOrder.order_status) {
        // Gọi microservice update_product để cập nhật sản phẩm
        await lastValueFrom(this.Product.send("update_product", { order_id }));
        // Cập nhật trạng thái đơn hàng nếu microservice thành công
        await this.prisma.order.update({
          data: { order_status: true },
          where: { order_id: checkOrder.order_id },
        });

        // Trả về phản hồi khi cập nhật thành công
        return new Response<string>("200", "The order was processed successfully.", checkOrder);
      } else {
        return new Response<string>("400", "The order has already been processed", checkOrder);
      }
    } catch (error) {
      // Xử lý ngoại lệ nếu microservice không thành công
      return new Response<string>("400", "Failed to process the order", error.message || error);
    }
  }
}
