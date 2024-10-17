import { IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateShip {
    @IsString()
    full_name: string;
    @IsString()
    email: string;
    @IsString()
    @IsPhoneNumber("VN")
    phone: string;
    @IsString()
    address: string;
    @IsString()
    ship_create: string;
    @IsNumber()
    order_id: number;
}