import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    const users = await read();

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);

    await write(users);
    return newUser;
  }

  public async getById(userId: number): Promise<IUser | null> {
    const users = await read();

    return users.find((user) => user.id === userId);
  }

  public async update(userIndex: number, dto: Partial<IUser>): Promise<IUser> {
    const users = await read();

    users[userIndex].name = dto.name;
    users[userIndex].email = dto.email;
    users[userIndex].password = dto.password;

    await write(users);
    return users[userIndex];
  }

  public async delete(userIndex: number): Promise<void> {
    const users = await read();

    users.splice(userIndex, 1);

    await write(users);
  }
}

export const userRepository = new UserRepository();
