import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { Model } from 'mongoose';
import { Admin } from './schema/adminschema';
import { getModelToken } from '@nestjs/mongoose';
import { RegisterDto } from './dto/admin.register';
import { LoginDto } from './dto/admin.login';

describe('AdminService', () => {
  let service: AdminService;
  let adminModel: Model<Admin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Admin.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    adminModel = module.get<Model<Admin>>(getModelToken(Admin.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new admin', async () => {
    const registerDto: RegisterDto = {
      adminname: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      profilepic: '/uploads/cats/dec',
    };
    const file: any = {
      fieldname: 'profilepic',
      originalname: 'example.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1000,
      buffer: Buffer.from('mock file content'),
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(adminModel.prototype, 'save').mockResolvedValueOnce(null);

    const result = await service.registerAdmin(registerDto, file, res);
    expect(result).toEqual({ message: 'Admin registered successfully' });
  });
  it('should login an admin', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(adminModel, 'findOne').mockResolvedValueOnce({
      adminname: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    } as Admin);

    const result = await service.loginAdmin(loginDto, res);
    expect(result).toEqual({
      message: 'Login successful',
      accessToken: expect.any(String),
    });
  });
});
