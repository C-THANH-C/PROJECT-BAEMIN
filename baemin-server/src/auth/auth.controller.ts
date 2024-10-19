import { LoginDto, SignUpDto, UpdateDto } from './dto/index.dto';
import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() dto: LoginDto) {
    console.log(dto);
    return this.authService.login(dto)
  }

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
    console.log(filePath)
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

}

