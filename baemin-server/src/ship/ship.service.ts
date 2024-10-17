import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';

@Injectable()
export class ShipService {
    constructor(private prisma: PrismaService) { }
    async getAllShip() {
        let data = await this.prisma.shipping.findMany({
            include: {
                order: {
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
                }
            }
        })
        return new Response<string>("200", "Get all ship", data)
    }
    async getOrderShip(order_id: number) {
        let data = await this.prisma.shipping.findMany({
            where: {
                order_id
            },
            include: {
                order: {
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
                }
            }
        })
        if (data.length > 0)
            return new Response<string>("200", "Get ship order", data)
        else {
            return new Response<string>("200", "Get ship order not find", data)
        }
    }
    async createShip(dto) {
        let newShip = {
            ...dto,
            ship_create: new Date()
        }
        await this.prisma.shipping.create({
            data: newShip
        })
        return new Response<string>("201", "Shipping", newShip)
    }

}       
