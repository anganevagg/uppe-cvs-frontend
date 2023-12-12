import { api } from 'src/boot/axios';

export interface LoginBody {
  email: string;
  password: string;
}

export class AuthRepository {
  login(payload: LoginBody) {
    return api.post('/auth/sing-in', payload);
  }
}
