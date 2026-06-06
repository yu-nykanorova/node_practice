import { IUser } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("+password");
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }

  public async getByOldLoginDate(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          localField: "_id",
          foreignField: "_userId",
          as: "tokens",
        },
      },
      {
        $addFields: {
          lastLogin: {
            $max: "$tokens.updatedAt",
          },
        },
      },
      {
        $match: {
          $or: [{ lastLogin: { $lt: date } }, { lastLogin: null }],
        },
      },
    ]);
  }

  public async update(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async delete(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
