import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "src/models/language.entity";
import { LanguageController } from "./language.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Language])],
    controllers: [LanguageController],
})
export class LanguageModule {}
