import { AxiosError, isAxiosError } from 'axios';
import { AuthRepository } from './repository';
import { useLoginStore } from 'stores/login';
import { Ref } from 'vue';
import { errorHandler } from 'src/helpers/error';

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
      store.token = response.data?.access_token;
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
}
