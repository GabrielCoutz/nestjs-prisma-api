import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '../../../repository/product/product-repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductService } from './product.service';

const product: CreateProductDto = {
  name: 'productName',
  price: 100,
};
const userId = '123';

const mockedReturn = {
  id: '123456',
  ...product,
  description: '',
  created_at: 'dd/mm/yyyy',
  user: {
    id: userId,
    name: 'userName',
  },
};

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(mockedReturn),
            getAll: jest.fn().mockResolvedValue([mockedReturn]),
            getUnique: jest.fn().mockResolvedValue(mockedReturn),
            update: jest.fn().mockResolvedValue(mockedReturn),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  describe('Create product', () => {
    it('should create', async () => {
      const result = await productService.create(userId, product);

      expect(productRepository.create).toBeCalledTimes(1);
      expect(result).toStrictEqual(mockedReturn);
    });
  });

  describe('Update product', () => {
    it('should update', async () => {
      const result = await productService.update(userId, product);

      expect(productRepository.update).toBeCalledTimes(1);
      expect(result).toStrictEqual(mockedReturn);
    });

    it('should throw NotFoundException with invalid product id', async () => {
      jest.spyOn(productRepository, 'getUnique').mockResolvedValueOnce(null);

      expect(productService.update(userId, product)).rejects.toThrowError(
        NotFoundException,
      );
      expect(productRepository.getUnique).toBeCalledTimes(1);
    });
  });

  describe('Get product', () => {
    it('should get unique product', async () => {
      const result = await productService.findUnique(userId);

      expect(productRepository.getUnique).toBeCalledTimes(1);
      expect(result).toStrictEqual(mockedReturn);
    });

    it('should get all products', async () => {
      const result = await productService.findAll();

      expect(productRepository.getAll).toBeCalledTimes(1);
      expect(result).toStrictEqual([mockedReturn]);
    });

    it('should throw NotFounError with invalid product id', async () => {
      jest.spyOn(productRepository, 'getUnique').mockResolvedValueOnce(null);

      expect(productService.findUnique(userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(productRepository.getUnique).toBeCalledTimes(1);
    });
  });

  describe('Delete product', () => {
    it('should delete', async () => {
      await productService.delete(userId);

      expect(productRepository.delete).toBeCalledTimes(1);
    });

    it('should throw NotFoundException with invalid product id', async () => {
      jest.spyOn(productRepository, 'getUnique').mockResolvedValueOnce(null);

      expect(productService.delete(userId)).rejects.toThrowError(
        NotFoundException,
      );
      expect(productRepository.getUnique).toBeCalledTimes(1);
    });
  });
});
