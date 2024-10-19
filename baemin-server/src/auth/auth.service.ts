
import { Injectable } from '@nestjs/common';
import { Response } from 'src/response';
import * as bcrypt from 'bcrypt';
import { user_role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }
    async login(dto) {

        let checkUser = await this.prisma.users.findFirst({
            where: {
                OR: [
                    { email: dto.email },
                ]
            }
        })
        if (checkUser) {
            if (bcrypt.compareSync(dto.password, checkUser.password)) {
                let token = this.jwtService.sign({ user: checkUser.role, user_id: checkUser.user_id }, {
                    algorithm: "HS256",
                    expiresIn: "5d", secret: "THANH"
                },)
                return new Response<string>("200", "Login success", token)
            }
            else return new Response<string>("200", "Password error", null)
        }
        else {
            return new Response<string>("404", "Email error", null)
        }
    }
    async signUp(dto, filePath: Array<string>) {
        console.log(dto);
        let hashPassword = await bcrypt.hashSync(dto.password, 10)
        let checkUser = await this.prisma.users.findFirst({
            where: {
                OR: [
                    { account: dto.account },
                    { email: dto.email },
                    { phone: dto.phone }
                ]
            }
        })
        if (checkUser) {
            const checkResult = checkUser.email === dto.email
                ? "Email"
                : checkUser.account === dto.account
                    ? "Account"
                    : "Phone";
            return new Response<string>("400", `${checkResult} exists`, null)
        }
        let newUser = {
            ...dto,
            password: hashPassword,
            role: user_role.user,
            // user_create: new Date(),
            user_image: filePath || [],
        }
        await this.prisma.users.create({
            data: newUser
        })
        return new Response<string>("201", "User created", newUser)
    }
    async updateUser(user_id: number, dto, filePath) {


        let checkUser = await this.prisma.users.findUnique({
            where: {
                user_id
            }
        })
        if (!checkUser) return new Response<string>("400", "User not found", null)
        let hashPassword = await bcrypt.hashSync(dto.password, 10)
        let newUser = {
            ...dto,
            password: hashPassword,
            user_create: new Date(),
            user_image: filePath || []
        }
        let checkUsePatch = await this.prisma.users.findMany({
            where: {
                OR: [
                    { account: newUser.account },
                    { email: newUser.email },
                    { phone: newUser.phone }
                ]
            }
        })
        if (checkUsePatch.length > 1) return new Response<string>("400", "Email or account or phone exits", checkUsePatch)
        await this.prisma.users.update({
            data: newUser,
            where: {
                user_id
            }
        })
        return new Response<string>("201", "User update", newUser)

    }
    async uploadAvatar(user_id: number, user_image) {
        let checkUser = await this.prisma.users.findFirst({
            where: {
                user_id
            }
        })
        if (!checkUser) {
            return new Response<string>("404", "User not found", null)
        }
        let newAvatar = {
            user_image

        }
        await this.prisma.users.update({
            data: newAvatar.user_image,
            where: { user_id }
        })
        return new Response<string>("404", "Upload avatar success", checkUser)
    }
}
