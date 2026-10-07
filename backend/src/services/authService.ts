import prisma from '../prisma.js';
import { comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';
import { LoginInput } from '../validators/authValidator.js';

export const loginUser = async (input: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase().trim() },
  });

  if (!user) {
    throw { status: 401, message: 'Identifiants invalides (email ou mot de passe incorrect)' };
  }

  const isMatch = await comparePassword(input.password, user.passwordHash);
  if (!isMatch) {
    throw { status: 401, message: 'Identifiants invalides (email ou mot de passe incorrect)' };
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw { status: 404, message: 'Utilisateur introuvable' };
  }

  return user;
};
