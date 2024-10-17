import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto, UpdateStoreDto } from './dto';
import { Role } from 'src/authGuard/role.enum';
import { Roles, ROLES_KEY } from 'src/authGuard/role';
import { AuthGuard } from 'src/authGuard/auth.guard';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Get("/get-all-store")
  getAllStore() {
    return this.storeService.getAllStore();
  }
  @Roles(Role.Store, Role.Admin)
  @UseGuards(AuthGuard)
  @Post("/create-store")
  createStore(@Body() body: StoreDto, @Request() res: any) {
    let data = res.user;
    return this.storeService.createStore(body, data)
  }
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
