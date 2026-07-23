import { UserModel } from "../models/user.model.js";

export const userRepository = {
  async findByEmail(email: string) {
    return UserModel.findOne({ email: email.toLowerCase() });
  },

  async findById(id: string) {
    return UserModel.findById(id);
  },

  async createUser(input: {
    name: string;
    email: string;
    passwordHash: string;
    role?: "user" | "creator" | "admin";
  }) {
    return UserModel.create(input);
  },

  async updateAvatar(userId: string, avatarUrl: string) {
    return UserModel.findByIdAndUpdate(userId, { avatarUrl }, { new: true });
  },
};
