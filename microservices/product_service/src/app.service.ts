import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from "./response"
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { ElasticsearchService } from '@nestjs/elasticsearch';
@Injectable()
export class AppService {
    constructor(private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private elasticService: ElasticsearchService
    ) { }


    async getAllProduct() {
        let dataCache = await this.cacheManager.get("product_cache")
        console.log("test cache")
        if (dataCache) {
            console.log("tra cache")
            return dataCache
        }

        let data = await this.prisma.product.findMany()
        console.log("luu cache")
        this.cacheManager.set("product_cache", data)
        return data
    }

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
    async getElastic({ name }) {
        // let data = await this.elasticService.search({
        //     index: "product_index",
        //     query: {
        //         match: {
        //             "product_name": `${name}`
        //         }
        //     }
        // })
        let data = await this.elasticService.search({
            index: "product_index"
        })
        console.log(data)
        return data
    }


}
