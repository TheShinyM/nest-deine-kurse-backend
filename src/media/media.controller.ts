import { Controller, Get, Post, UseInterceptors} from "@nestjs/common"
import { Param, Res, UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable, of } from "rxjs";
import { join } from "path";
import { ImageUrlResponse } from "./models/imageUrlResponse";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseCard } from "src/models/course.entity";
import { Repository } from "typeorm";
import * as fs from "fs";

@Controller("media")
export class MediaController {
    public constructor(@InjectRepository(CourseCard) private courseRepo: Repository<CourseCard>) {}

    @Post("upload/:id")
    @UseInterceptors(
        FileInterceptor("myfile", {
            storage: diskStorage({
                destination: "./uploads/tns",
                filename: (req, file, cb) => {
                    const filename: string = path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
                    const ext: string = path.parse(file.originalname).ext;

                    return cb(null, `${filename}${ext}`);
                },
            }),
        })
    )
    public async uploadMedia(@UploadedFile() myfile: Express.Multer.File, @Param("id") id: number): Promise<ImageUrlResponse> {
        const findCourse: CourseCard = await this.courseRepo.findOneBy({ id: id });
        if (findCourse?.imageUrl) {
            await fs.unlink(process.cwd() + "uploads/tns/" + findCourse.imageName, (error: Error) => {
                console.log("Fehler");
            });
        }
        console.log("myfile", myfile);
        return { imageUrl: "http://localhost:3001/media/" + myfile.filename, imageName: myfile.filename };
    }

    @Get(":imagename")
    public findImage(@Param("imagename") imagename, @Res() res): Observable<unknown> {
        return of(res.sendFile(join(process.cwd(), "uploads/tns/" + imagename)));
    }
}
