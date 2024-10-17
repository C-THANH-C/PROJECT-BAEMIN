import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';

@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {

    }
    async getAllStore() {
        let data = await this.prisma.food_store.findMany({
            include: {
                users: {
                    select: {
                        full_name: true,
                        address: true,
                        user_image: true
                    }
                }
            }
        })
        return new Response<string>("200", "Get all food store ", data)
    }
    async createStore(dto, data: any) {
        let user_id = data.user_id
        let checkStore = await this.prisma.food_store.findFirst({
            where: {
                AND: {
                    store_name: dto.store_name,
                    user_id,
                    address: dto.address
                }
            }
        })
        if (checkStore) {
            return new Response<string>("400", "Store exits", null)
        }
        let newStore = {
            ...dto,
            user_id
        }
        await this.prisma.food_store.create({
            data: newStore
        })
        return new Response<string>("201", "Food store create", newStore)
    }
    async updateStore(dto, data, id: number) {
        let user_id = data.user_id
        let checkStore = await this.prisma.food_store.findFirst({
            where: {
                store_id: id
            }
        })
        if (checkStore) {
            if (checkStore.user_id === (await data.user_id) || (await data.user) === "admin") {
                let updateStore = {
                    ...dto,
                    user_id
                }
                await this.prisma.food_store.update({
                    data: updateStore,
                    where: { store_id: id }
                })
                return new Response<string>("201", "Food store update", updateStore)
            }
            else {
                return new Response<string>("400", "Bạn không có quyền", null)
            }
        } else {
            if (!checkStore) return new Response<string>("400", "Store not find", null)
        }


    }
    async deleteStore(store_id: number) {
        let checkStore = await this.prisma.food_store.findFirst({
            where: {
                store_id
            }
        })
        console.log(checkStore);
        if (!checkStore) return new Response<string>("400", "Store not found", null)
        await this.prisma.food_store.delete({
            where: { store_id }
        })
        return new Response<string>("400", "Store deletes", null)
    }

}
