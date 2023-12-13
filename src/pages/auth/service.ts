import { AxiosError, isAxiosError } from 'axios';
import { AuthRepository } from './repository';
import { useLoginStore } from 'stores/login';
import { Ref } from 'vue';
import { errorHandler } from 'src/helpers/error';
import { api } from 'src/boot/axios';

export class AuthService {
  private repository = new AuthRepository();
  async login(loading: Ref<boolean>, email: string, password: string) {
    const store = useLoginStore();
    try {
      loading.value = true;
      const response = await this.repository.login({
        email,
        password,
      });
      store.setToken(response.data?.access_token);
    } catch (err) {
      console.debug(err);
      if (!isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.status == 400) {
          errorHandler('Credenciales invalidas');
        } else {
          errorHandler('Error en el servicio por favor espere...');
        }
      }
    } finally {
      loading.value = false;
    }
  }
  async signup(
    loading: Ref<boolean>,
    firstName: string,
    lastName: string,
    password: string,
    code: string
  ) {
    try {
      loading.value = true;
      await this.repository.signup(
        {
          firstName,
          lastName,
          password,
        },
        code
      );
      return true;
    } catch (err) {
      console.debug(err);
      if (!isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.status == 400) {
          errorHandler('Datos invalidos');
        } else {
          errorHandler('Error en el servicio por favor espere...');
        }
      }
    } finally {
      loading.value = false;
    }
  }
}
