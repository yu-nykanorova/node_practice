import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return {} as IUser;

    // const users = await read();
    //
    // const newUser: IUser = {
    //   id: users.length ? users[users.length - 1].id + 1 : 1,
    //   name: dto.name,
    //   email: dto.email,
    //   password: dto.password,
    // };
    // users.push(newUser);
    //
    // await write(users);
    // return newUser;
  }

  public async getById(userId: string): Promise<IUser | null> {
    return {} as IUser;

    // const users = await read();
    //
    // return users.find((user) => user.id === userId) || null;
  }

  public async update(userIndex: number, dto: Partial<IUser>): Promise<IUser> {
    return {} as IUser;

    // const users = await read();
    //
    // users[userIndex] = { ...users[userIndex], ...dto };
    //
    // await write(users);
    // return users[userIndex];
  }

  public async delete(userIndex: number): Promise<void> {
    // const users = await read();
    //
    // users.splice(userIndex, 1);
    //
    // await write(users);
  }
}

export const userRepository = new UserRepository();
