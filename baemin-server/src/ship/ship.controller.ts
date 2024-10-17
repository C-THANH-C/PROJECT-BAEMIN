import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ShipService } from './ship.service';
import { CreateShip } from './dto';
import { AuthGuard } from 'src/authGuard/auth.guard';

@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) { }
  @Get("/get-all-ship")
  getAllShip() {
    return this.shipService.getAllShip()
  }
  @Get("get-order-ship/:id")
  getOrderShip(@Param("id") id: number) {
    return this.shipService.getOrderShip(+id)
  }
  @UseGuards(AuthGuard)
  @Post('/create-ship')
  createShip(@Body() body: CreateShip) {
    return this.shipService.createShip(body)
  }
}
