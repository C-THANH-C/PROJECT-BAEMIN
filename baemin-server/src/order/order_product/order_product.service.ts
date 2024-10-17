import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';

@Injectable()
export class OrderProductService {
    constructor(private prisma: PrismaService) { }
    async getAllOrderProduct() {
        let data = await this.prisma.order_product.findMany({
            include: {
                order:
                {
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
                        }
                    }
                }
            }
        })
        return new Response("200", "Get all order products ", data)
    }
    createOrderProduct(dto) {

    }
}
