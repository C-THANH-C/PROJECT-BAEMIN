import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct, PutProduct } from './dto';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { Roles } from 'src/authGuard/role';
import { Role } from 'src/authGuard/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('/get-all-product')
  getAllProduct() {
    return this.productService.getAllProduct()
  }

  @Get("/search/:key")
  getSearch(@Param('key') key: string) {
    return this.productService.getSearch(key)
  }

  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Post("/create-product")
  postProduct(@Body() body: CreateProduct) {
    return this.productService.createProduct(body)
  }

  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Patch('/put-product/:id')
  putProduct(@Body() body: PutProduct, @Param("id") id: number) {
    return this.productService.putProduct(body, +id)
  }
  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Delete("/delete-product/:id")
  deleteProduct(@Param("id") id: number, @Request() res: any) {
    return this.productService.deleteProduct(+id)
  }
}
