import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "src/models/language.entity";
import { Repository } from "typeorm";
import { CreateLanguageDTO } from "./enums/language.dto";

@Controller("language")
export class LanguageController {
    public constructor(@InjectRepository(Language) private languageRepo: Repository<Language>) {}

    @Get("all")
    public getAllLanguages(): Promise<Language[]> {
        return this.languageRepo.find({ where: { isDeactivated: false } });
    }

    @Post()
    public async createLanguage(@Body() lang: CreateLanguageDTO): Promise<Language[]> {
        const language: Language = this.languageRepo.create(lang);
        await this.languageRepo.save(language);
        return this.languageRepo.find({ where: { isDeactivated: false } });
    }
}
