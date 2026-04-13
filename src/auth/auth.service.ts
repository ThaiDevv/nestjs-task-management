import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entityUsers';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/auth.createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repositoryUser: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signup(createUserDto: createUserDto): Promise<void> {
    const { username, password } = createUserDto;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const salt = await bcrypt.genSalt();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.repositoryUser.create({
      username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hashPassword,
    });
    try {
      await this.repositoryUser.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async login(createUserDto: createUserDto): Promise<{ accessToken: string }> {
    const { username, password } = createUserDto;
    const user = await this.repositoryUser
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('wrong password');
      }
    }
  }
}
