import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct, PutProduct } from './dto';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { Roles } from 'src/authGuard/role';
import { Role } from 'src/authGuard/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
@ApiTags("Product")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    @Inject("PRODUCT_NAME") private Products: ClientProxy
  ) { }

  @Get('/get-all-product')
  getAllProduct() {
    return this.productService.getAllProduct()
  }

  @Get("/search/:key")
  getSearch(@Param('key') key: string) {
    return this.productService.getSearch(key)
  }



  @UseInterceptors(FilesInterceptor("image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Post("/create-product")
  async postProduct(@Body() body: CreateProduct, @UploadedFiles() files: Array<Express.Multer.File>) {
    let file = files || []
    let pathImage: string[] = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )
    return this.productService.createProduct(body, pathImage)
  }


  @UseInterceptors(FilesInterceptor("product_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images/product",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Patch('/put-product/:id')
  async updateProduct(@Body() body: PutProduct, @Param("id") id: number, @UploadedFiles() files: Array<Express.Multer.File>) {
    let file = files || []
    let pathImage: string[] = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )
    return this.productService.updateProduct(body, +id, pathImage)
  }
  @Roles(Role.Admin, Role.Store)
  @UseGuards(AuthGuard)
  @Delete("/delete-product/:id")
  deleteProduct(@Param("id") id: number, @Request() res: any) {
    return this.productService.deleteProduct(+id)
  }
  @Get("/all-product-service")
  async getProductService() {
    const getAllProducts = this.Products.send("all-products", "");
    return getAllProducts
  }
  @Get("/elastic")
  async getElastic(@Query() a) {
    const getElastic = this.Products.send("elastic", a)
    return getElastic
  }
}
