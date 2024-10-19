import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) { }
    async getAllProduct(): Promise<any> {
        let data = await this.prisma.product.findMany({
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
                food_store: {
                    select: {
                        store_name: true,
                        store_image: true
                    }
                }
            }
        })
        return new Response<string>("200", "Get all product", data)
    }

    async getSearch(product_name: any) {
        let data = await this.prisma.product.findMany({
            where: {
                product_name: {
                    contains: product_name,
                    mode: 'insensitive'
                }
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
                food_store: {
                    select: {
                        store_name: true,
                        store_image: true
                    }
                }
            }
        })
        if (data.length > 0)
            return new Response<string>("200", "Find", data)
        else return new Response<string>("400", "Not find", null)
    }
    async createProduct(dto, pathImage: Array<string>) {
        let checkProduct = await this.prisma.product.findFirst({
            where: {
                AND: {
                    product_name: dto.product_name,
                    store_id: +dto.store_id,
                    category_id: +dto.category_id
                }
            }
        })
        if (checkProduct) return new Response<string>("400", "Product existed", checkProduct)
        let newProduct = {
            ...dto,
            product_create: new Date(),
            product_image: pathImage || [],
            store_id: Number(dto.store_id),
            category_id: Number(dto.category_id),
            product_price: Number(dto.product_price),
            product_quantity: Number(dto.product_quantity)
        }

        let data = await this.prisma.product.create({
            data: newProduct
        })
        let productNew = await this.prisma.product.findFirst({
            where: {
                product_name: data.product_name
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
                food_store: {
                    select: {
                        store_name: true,
                        store_image: true
                    }
                }
            }
        })
        return new Response<string>("200", "Create successful product", productNew)
    }
    async updateProduct(dto, id: number, pathImage: Array<string>) {
        console.log(dto);
        let checkProduct = await this.prisma.product.findFirst({
            where: {
                product_id: id,
            }
        })
        if (!checkProduct) return new Response<string>("400", "Product not find", null)
        let newProduct = {
            ...dto,
            product_create: new Date(),
            product_image: pathImage || [],
            store_id: Number(dto.store_id),
            category_id: Number(dto.category_id),
            product_price: Number(dto.product_price),
            product_quantity: Number(dto.product_quantity)

        }
        let data = await this.prisma.product.update({
            data: newProduct,
            where: {
                product_id: id,
            }
        })
        let productUpdate = await this.prisma.product.findFirst({
            where: {
                product_name: data.product_name
            },
            include: {
                category: {
                    select: {
                        category_name: true,
                    }
                },
                food_store: {
                    select: {
                        store_name: true,
                        store_image: true
                    }
                }
            }
        })
        return new Response<string>("200", "Create successful product", productUpdate)
    }
    async deleteProduct(id: number) {
        let checkProduct = await this.prisma.product.findFirst({
            where: {
                product_id: id,
            }
        })
        if (!checkProduct) return new Response<string>("400", "Product not find", null)
        await this.prisma.product.delete({
            where: {
                product_id: id
            }
        })
        return new Response<string>("200", "Product deleted", null)
    }
}
