import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryModule } from './repository.module';

describe('RepositoryModule', () => {
  let repositoryModule: RepositoryModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
    }).compile();

    repositoryModule = module.get<RepositoryModule>(RepositoryModule);
  });

  it('should be defined', () => {
    expect(repositoryModule).toBeDefined();
  });
});
