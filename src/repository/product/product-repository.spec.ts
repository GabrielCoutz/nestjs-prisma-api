import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ProductRepository } from './product-repository';

const productMocked = {
  id: '123',
  name: 'product_name',
  price: '100',
  created_at: 'dd/mm/yyyy',
  user: {
    id: 'user_id',
    name: 'user_name',
  },
};

describe('productRepository', () => {
  let productRepository: ProductRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRepository],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn().mockResolvedValue(productMocked),
              findMany: jest.fn().mockResolvedValue([productMocked]),
              findUnique: jest.fn().mockResolvedValue(productMocked),
              update: jest.fn().mockResolvedValue(productMocked),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(productRepository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('Create product', () => {
    it('should create', async () => {
      const result = await productRepository.create(
        '123',
        productMocked as any,
      );

      expect(result).toStrictEqual(productMocked);
      expect(prismaService.product.create).toBeCalledTimes(1);
    });
  });

  describe('Update product', () => {
    it('should update', async () => {
      const result = await productRepository.update(
        '123',
        productMocked as any,
      );

      expect(result).toStrictEqual(productMocked);
      expect(prismaService.product.update).toBeCalledTimes(1);
    });
  });

  describe('Delete product', () => {
    it('should delete', async () => {
      await productRepository.delete('123');

      expect(prismaService.product.delete).toBeCalledTimes(1);
    });
  });

  describe('Get product', () => {
    it('should get unique product', async () => {
      const result = await productRepository.getUnique('123');

      expect(result).toStrictEqual(productMocked);
      expect(prismaService.product.findUnique).toBeCalledTimes(1);
    });

    it('should get all products', async () => {
      const result = await productRepository.getAll();

      expect(result).toStrictEqual([productMocked]);
      expect(prismaService.product.findMany).toBeCalledTimes(1);
    });
  });
});
