import { Test, TestingModule } from '@nestjs/testing';
import { ModCoursesController } from './mod-courses.controller';

describe('ModCoursesController', () => {
  let controller: ModCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModCoursesController],
    }).compile();

    controller = module.get<ModCoursesController>(ModCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
