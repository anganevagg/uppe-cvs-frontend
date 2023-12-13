import { api } from 'src/boot/axios';

export interface LoginBody {
  email: string;
  password: string;
}
export interface SignupPayload {
  firstName: string;
  lastName: string;
  password: string;
}
export class AuthRepository {
  login(payload: LoginBody) {
    return api.post('/auth/sign-in', payload);
  }
  signup(payload: SignupPayload, code: string) {
    return api.post('/auth/sign-up', payload, {
      params: {
        invitationCode: code,
      },
    });
  }
}
