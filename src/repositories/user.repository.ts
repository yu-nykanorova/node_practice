import { IUser, IUserListQuery } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: Record<string, any> = {};

    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
      // filterObj.$or = [
      //     { name: { $regex: query.search, $options: "i" } },
      //     { email: { $regex: query.search, $options: "i" } },
      // ];
    }

    // TODO ordering for search, sorting

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = limit * (page - 1);

    return await Promise.all([
      User.find(filterObj).limit(limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
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

  public async deleteField(userId: string, fieldName: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $unset: { [fieldName]: "" },
    });
  }
}

export const userRepository = new UserRepository();
