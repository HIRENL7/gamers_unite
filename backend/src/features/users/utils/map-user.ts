import type { UserDocument } from "../models/user.model.js";
import type { PublicUser } from "../schemas/user.schema.js";

export function mapUserToPublic(user: UserDocument): PublicUser {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  };
}
