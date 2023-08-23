import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUser(query: object): Promise<User | null> {
    return this.userModel.findOne(query).exec();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
