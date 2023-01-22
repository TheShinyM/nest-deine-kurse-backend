import { Controller, Post, UseInterceptors} from '@nestjs/common'
import { UploadedFile } from '@nestjs/common/decorators/http/route-params.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { Observable, of } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

@Controller('media')
export class MediaController {
    
    @Post("upload")
    @UseInterceptors(
        FilesInterceptor("myfile", 1, {
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
    public uploadMedia(@UploadedFile() myfile): Observable<unknown> {
        console.log("myfile", myfile);
        return of({ imagePath: myfile });
    }
}
