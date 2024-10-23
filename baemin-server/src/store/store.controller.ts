import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto, UpdateStoreDto } from './dto';
import { Role } from 'src/authGuard/role.enum';
import { Roles, ROLES_KEY } from 'src/authGuard/role';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HttpExceptionFilter } from 'src/interceptor/exception';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Store")
@UseFilters(HttpExceptionFilter)
@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }


  @Get("/get-all-store")
  getAllStore() {
    return this.storeService.getAllStore();
  }

  @UseInterceptors(FilesInterceptor("store_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      }
    })
  }))
  @Roles(Role.Store, Role.Admin)
  @UseGuards(AuthGuard)
  @Post("/create-store")
  async createStore(@Body() body: StoreDto, @Request() res: any, @UploadedFile() files: Array<Express.Multer.File>) {
    let file = files || []
    const pathImg: string[] = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )
    let data = res.user;
    return this.storeService.createStore(body, data, pathImg)
  }

  @UseInterceptors(FilesInterceptor("store_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      }
    })
  }))
  @Roles(Role.Store, Role.Admin)
  @UseGuards(AuthGuard)
  @Patch("/update-store/:id")
  updateStore(@Body() body: UpdateStoreDto, @Request() res: any, @Param("id") id: number) {
    let data = res.user;
    return this.storeService.updateStore(body, data, +id)
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Delete("/delete-store/:id")
  deleteStore(@Param("id") id: number) {
    return this.storeService.deleteStore(+id)
  }
}
