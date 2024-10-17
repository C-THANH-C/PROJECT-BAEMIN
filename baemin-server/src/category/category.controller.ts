import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategory, UpdateCategory } from './dto';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { Roles } from 'src/authGuard/role';
import { Role } from 'src/authGuard/role.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("/get-all-category")
  getAllCategory() {
    return this.categoryService.getAllCategory()
  }
  @Get("/get-category-product/:id")
  getCategoryProduct(@Param("id") id: number) {
    return this.categoryService.getCategoryProduct(+id)
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Post("/create-category")
  createCategory(@Body() body: CreateCategory) {
    return this.categoryService.createCategory(body)
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Patch('/update-category/:id')
  updateCategory(@Body() body: UpdateCategory, @Param("id") id: number) {
    return this.categoryService.updateCategory(body, +id)
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Delete('/delete-category/:id')
  deleteCategory(@Param("id") id: number) {
    return this.categoryService.deleteCategory(+id)
  }

}
