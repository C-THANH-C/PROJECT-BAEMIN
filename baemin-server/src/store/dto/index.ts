import { IsArray, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

interface StoreInfo {
    store_description: string,
    store_title: string,
    store_open: string
}
export class StoreDto {
    @IsString()
    @IsNotEmpty()
    store_name: string;
    @IsString()
    @IsNotEmpty()
    address: string;
    @IsString()
    @IsNotEmpty()
    store_information: StoreInfo;
    @IsArray()
    @IsOptional()
    store_image: string[];
    @IsString()
    @IsNotEmpty()
    user_id: number;
}

export class UpdateStoreDto {
    @IsString()
    @IsNotEmpty()
    store_name: string;
    @IsString()
    @IsNotEmpty()
    address: string;
    @IsString()
    @IsNotEmpty()
    store_information: StoreInfo;
    @IsString()
    @IsNotEmpty()
    store_image: string;
    @IsString()
    @IsNotEmpty()
    user_id: number;
}