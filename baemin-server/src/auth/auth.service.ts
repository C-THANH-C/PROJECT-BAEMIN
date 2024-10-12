import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Response } from 'src/response';
import * as bcrypt from 'bcrypt';
import { user_role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }
    async login(dto) {
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
    async signUp(dto) {
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
            return new Response<string>("400", `existed`, null)
        }
        let newUser = {
            ...dto,
            password: hashPassword,
            role: user_role.user,

        }
        await this.prisma.users.create({
            data: newUser
        })
        return new Response<string>("201", "User created", newUser)
    }

}
