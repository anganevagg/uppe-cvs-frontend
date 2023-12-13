import { ICreateUser, IUpdateUser, IUser } from 'src/interfaces/user.interface';
import { UserRepository } from './repository';
import { Loading } from 'quasar';
import { Ref } from 'vue';
import { ICreateArticle } from 'src/interfaces/article.interface';
import { user } from './routes';

export class UserService {
  private repository = new UserRepository();
  async getMe(user: Ref<IUser | null>) {
    try {
      Loading.show();
      const response = await this.repository.getMe();
      user.value = response.data;
    } catch (error) {
    } finally {
      Loading.hide();
    }
  }
  async updateMe(loading: Ref<boolean>, updateUser: IUpdateUser) {
    try {
      loading.value = true;
      await this.repository.updateMe(updateUser);
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
  async createArticle(
    loading: Ref<boolean>,
    article: ICreateArticle,
    id: string
  ) {
    try {
      loading.value = true;
      await this.repository.createArticle(article, id);
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
  async deleteArticle(id: string) {
    try {
      await this.repository.deleteArticle(id);
    } catch (error) {
    } finally {
    }
  }
  async getAll(search: string, users: Ref<IUser[]>) {
    try {
      const response = await this.repository.getAll({
        search,
      });
      users.value = response.data;
    } catch (error) {
    } finally {
    }
  }
  async createUser(loading: Ref<boolean>, user: ICreateUser) {
    try {
      loading.value = true;
      await this.repository.createUser(user);
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
}
