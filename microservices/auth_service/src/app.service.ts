import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Response } from './response';
import * as bcrypt from 'bcrypt'
import { user_role } from '@prisma/client';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }
  async getAllUser(): Promise<any> {
    let data = await this.prisma.users.findMany();
    return new Response<string>("200", "Get all data users", data)
  }
  async login(dto) {
    let checkUser = await this.prisma.users.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { phone: dto.phone },
          { account: dto.account }
        ]
      }
    })
    let checkResult = (dto.email) ? "Email" : (dto.phone) ? "Phone" : "Account"
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
      return new Response<string>("404", `${checkResult} error`, null)
    }
  }
  async signUp(data) {
    let filePath: Array<string> = await data.filePath
    let dto = await data.dto
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
      user_create: new Date(),
      user_image: filePath || [],
    }
    await this.prisma.users.create({
      data: newUser
    })
    return new Response<string>("201", "User created", newUser)
  }

}
