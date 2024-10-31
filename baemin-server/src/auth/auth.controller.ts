import { LoginDto, SignUpDto, UpdateDto } from './dto/index.dto';
import { Body, Controller, Get, Inject, Param, Patch, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { send } from 'process';
import { Roles } from 'src/authGuard/role';
import { Role } from 'src/authGuard/role.enum';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    @Inject("AUTH_NAME") private Auth: ClientProxy
  ) { }



  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor("user_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Post("/sign-up")
  async signUp(@Body() dto: SignUpDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    const file = files || []
    const filePath: string[] = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )

    return this.authService.signUp(dto, filePath)
  }
  // @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor("user_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Patch("/update-user/:id")
  async updateUser(@Param("id") id: number, @Body() body: UpdateDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    const file = files || []
    const filePath = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )

    return this.authService.updateUser(+id, body, filePath)
  }

  @UseInterceptors(FilesInterceptor("image", 2, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, cb) => {
        let data = new Date()
        cb(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Patch("/upload-avatar/:id")
  async uploadAvatar(@UploadedFiles() files: Array<Express.Multer.File>, @Param("id") id: number) {
    const file = await files.map((file) => {
      return file.filename || []
    })
    return this.authService.uploadAvatar(+id, file)
  }


  //AUTH SERVICE
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get("/get-all-user")
  async getAllUser() {
    let allUsers = await this.Auth.send("get-all-user", "")
    return allUsers

  }
  @Post("/login-service")
  async loginService(@Body() dto: LoginDto) {
    let login = await this.Auth.send("post-login", dto)
    return login

  }
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor("user_image", 3, {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => {
        let data = new Date()
        callback(null, data.getTime() + "-" + file.originalname)
      },
    })
  }))
  @Post("/sign-up-service")
  async SignUpService(@Body() dto: SignUpDto, @UploadedFile() files: Array<Express.Multer.File>) {
    const file = files || []
    const filePath: string[] = await Promise.all(
      file.map((file) => {
        return file.filename
      })
    )
    let signUp = await this.Auth.send("sign-up", { dto, filePath })
    return signUp
  }
}

