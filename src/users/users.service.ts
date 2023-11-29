import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { ValidationOptions, registerDecorator } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
    // return this.userRepository.save(User);
  }

  findAll() {
    // return `This action returns all users`;
    return this.userRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

// export function IsUserExist(
//   property: string,
//   ValidationOptions?: ValidationOptions,
// ) {
//   return function (object:any, propertyme: string){
//     registerDecorator({
//       name: 'UserExist',
//     })
//   }
// }
