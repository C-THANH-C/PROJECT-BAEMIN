import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from "./response"

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) { }

    async updateProduct({ order_id }): Promise<Response<string>> {
        try {
            const checkOrderProduct = await this.prisma.order_product.findMany({
                where: { order_id: Number(order_id) },
            });
            if (checkOrderProduct.length === 0) {
                throw new HttpException(
                    `No products found for order ID ${order_id}`,
                    HttpStatus.NOT_FOUND,
                );
            }
            const productIds = checkOrderProduct.map((orderProduct) => orderProduct.product_id);
            const checkProduct = await this.prisma.product.findMany({
                where: { product_id: { in: productIds } },
            });
            for (const orderProduct of checkOrderProduct) {
                const findProduct = checkProduct.find((product) => product.product_id === orderProduct.product_id);

                if (findProduct) {
                    const newProductQuantity = findProduct.product_quantity - orderProduct.order_quantity;
                    if (newProductQuantity < 0) {
                        throw new HttpException(
                            `Insufficient quantity for product ID ${findProduct.product_id}. Available: ${findProduct.product_quantity}, Required: ${orderProduct.order_quantity}`,
                            HttpStatus.BAD_REQUEST,
                        );
                    }
                    await this.prisma.product.update({
                        where: { product_id: findProduct.product_id },
                        data: { product_quantity: newProductQuantity },
                    });
                }
            }
            return new Response<string>("200", 'Product quantities updated successfully', 'Success');
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'An internal server error occurred',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
