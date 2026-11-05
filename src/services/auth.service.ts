import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/auth";
import { MESSAGES } from "@/constants/messages";

export class AuthService {
  static async register(email: string, password: string) {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new Error("Email already registered");
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  static async authenticate(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}
