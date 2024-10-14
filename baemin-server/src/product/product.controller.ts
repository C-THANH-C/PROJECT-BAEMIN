import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct, PutProduct } from './dto';
import { AuthGuard } from 'src/authGuard/auth.guard';

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

  @Post("/create-product")
  postProduct(@Body() body: CreateProduct) {
    return this.productService.createProduct(body)
  }
  @Patch('/put-product/:id')
  putProduct(@Body() body: PutProduct, @Param("id") id: number) {
    return this.productService.putProduct(body, +id)
  }
  @UseGuards(AuthGuard)
  @Delete("/delete-product/:id")
  deleteProduct(@Param("id") id: number, @Request() res: any) {
    return this.productService.deleteProduct(+id)
  }
}
