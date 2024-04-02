import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { RegisterDto } from './dto/admin.register';
import { LoginDto } from './dto/admin.login';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should register a new user', async () => {
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
    jest.spyOn(adminService, 'registerAdmin').mockResolvedValueOnce({
      message: 'admin registered successfully',
    } as any);

    const response = await controller.registerAdmin(registerDto, file, res);
    expect(response).toEqual({ message: 'admin registered successfully' });
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(adminService, 'loginAdmin').mockResolvedValueOnce({
      message: 'Login successful',
      accessToken: 'token',
    } as any);

    const response = await controller.loginAdmin(loginDto, res);
    expect(response).toEqual({
      message: 'Login successful',
      accessToken: 'token',
    });
  });
});
