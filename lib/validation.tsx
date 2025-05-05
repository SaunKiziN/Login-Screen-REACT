

import { users } from './Data-storage/user-storage';

type LoginData = {
  email: string;
  password: string;
};

type ValidationResult = {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export function validateLogin(data: LoginData): ValidationResult {
  console.log('Dados recebidos na validação:', data);
  console.log('Usuários do banco:', users);

  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!data.email) {
    errors.email = 'Email é obrigatório';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Formato de e-mail inválido';
  }

  if (!data.password) {
    errors.password = 'Senha é obrigatória';
  }

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors,
      user: undefined,
    };
  }

  // Procurando o usuário no array de usuários
  const user = users.find(
    (user) => user.email === data.email && user.password === data.password
  );

  if (!user) {
    errors.email = 'Email ou senha incorretos';
    return {
      isValid: false,
      errors,
      user: undefined,
    };
  }

  return {
    isValid: true,
    errors: {},
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
