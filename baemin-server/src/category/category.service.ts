import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'src/response';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }
    async getAllCategory() {
        let data = await this.prisma.category.findMany()
        return new Response<string>("200", "Get all category", data)
    }
    async getCategoryProduct(category_id: number) {
        let data = await this.prisma.product.findMany({
            where: {
                category_id
            }
        })
        if (data.length === 0) return new Response<string>("200", "Product not data", null)
        return new Response<string>("200", "Get category product", data)

    }
    async createCategory(dto) {
        let checkCategory = await this.prisma.category.findFirst({
            where: {
                category_name: dto.category_name
            }
        })
        if (checkCategory) return new Response<string>("400", "Category exits", checkCategory)
        let newCategory = {
            ...dto,
            category_create: new Date()
        }
        await this.prisma.category.create({
            data: newCategory
        })
        return new Response<string>("400", "Category create", newCategory)
    }
    async updateCategory(dto, category_id: number) {
        let checkCategory = await this.prisma.category.findFirst({
            where: {
                category_id
            }
        })
        if (!checkCategory) return new Response<string>("400", "Category not found", null)
        let updateCategory = {
            ...dto,
            category_create: new Date()
        }
        let checkUpdateCategory = await this.prisma.category.findFirst({
            where: {
                category_name: updateCategory.category_name
            }
        })
        if (checkUpdateCategory) return new Response<string>("400", "Category exits", checkCategory)
        await this.prisma.category.update({
            data: updateCategory,
            where: { category_id }
        })
        return new Response<string>("201", "Category update", updateCategory)
    }
    async deleteCategory(category_id: number) {
        let checkCategory = this.prisma.category.findFirst({
            where: {
                category_id
            }
        })
        if (!checkCategory) return new Response<string>("400", "Category not found", null)
        await this.prisma.category.delete({
            where: {
                category_id
            }
        })
        return new Response<string>("200", "Category delete", null)
    }
}
