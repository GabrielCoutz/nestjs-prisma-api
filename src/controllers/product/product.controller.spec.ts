import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from '../../modules/product/dto/create-product.dto';
import { ProductService } from '../../modules/product/product/product.service';
import { ProductController } from './product.controller';

const product: CreateProductDto = {
  name: 'productName',
  price: 100,
};
const userInfo = {
  user: '123',
};

const mockedReturn = {
  id: '123456',
  ...product,
  description: '',
  created_at: 'dd/mm/yyyy',
  user: {
    id: '123',
    name: 'userName',
  },
};

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockedReturn),
            findAll: jest.fn().mockResolvedValue([mockedReturn]),
            findUnique: jest.fn().mockResolvedValue(mockedReturn),
            update: jest.fn().mockResolvedValue(mockedReturn),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('Create product', () => {
    it('should create', async () => {
      const result = await productController.create(userInfo, product);

      expect(result).toStrictEqual(mockedReturn);
      expect(productService.create).toBeCalledTimes(1);
    });

    it('should throw with empty fields', async () => {
      jest.spyOn(productService, 'create').mockRejectedValueOnce(new Error());

      expect(
        productController.create(userInfo, {} as any),
      ).rejects.toThrowError();
      expect(productService.create).toBeCalledTimes(1);
    });
  });

  describe('Update product', () => {
    it('should update', async () => {
      const result = await productController.update('123', product);

      expect(result).toStrictEqual(mockedReturn);
      expect(productService.update).toBeCalledTimes(1);
    });

    it('should throw with empty fields', async () => {
      jest.spyOn(productService, 'update').mockRejectedValueOnce(new Error());

      expect(productController.update('123', {} as any)).rejects.toThrowError();
      expect(productService.update).toBeCalledTimes(1);
    });
  });

  describe('Get product', () => {
    it('should get all products', async () => {
      const result = await productController.findAll();

      expect(result).toStrictEqual([mockedReturn]);
      expect(productService.findAll).toBeCalledTimes(1);
    });

    it('should get unique product', async () => {
      const result = await productController.findUnique('123');

      expect(result).toStrictEqual(mockedReturn);
      expect(productService.findUnique).toBeCalledTimes(1);
    });

    it('should throw with not found product', async () => {
      jest
        .spyOn(productService, 'findUnique')
        .mockRejectedValueOnce(new Error());

      expect(productController.findUnique('123')).rejects.toThrowError();
      expect(productService.findUnique).toBeCalledTimes(1);
    });
  });

  describe('Delete product', () => {
    it('should delete', async () => {
      await productController.delete('123');

      expect(productService.delete).toBeCalledTimes(1);
    });

    it('should throw with not found product', async () => {
      jest.spyOn(productService, 'delete').mockRejectedValueOnce(new Error());

      expect(productController.delete('123')).rejects.toThrowError();
      expect(productService.delete).toBeCalledTimes(1);
    });
  });
});
