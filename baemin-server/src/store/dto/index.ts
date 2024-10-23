import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface StoreInfo {
    store_description: string,
    store_title: string,
    store_open: string
}
export class StoreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    store_name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    store_information: StoreInfo;
    @ApiProperty()
    @IsArray()
    @IsOptional()
    store_image: string[];
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: number;
}

export class UpdateStoreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    store_name: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    store_information: StoreInfo;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    store_image: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: number;
}