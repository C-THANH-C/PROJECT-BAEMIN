import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateShip {
    @ApiProperty()
    @IsString()
    full_name: string;
    @ApiProperty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsString()
    @IsPhoneNumber("VN")
    phone: string;
    @ApiProperty()
    @IsString()
    address: string;
    @ApiProperty()
    @IsString()
    ship_create: string;
    @ApiProperty()
    @IsNumber()
    order_id: number;
}