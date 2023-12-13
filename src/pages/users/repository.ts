import { api } from 'src/boot/axios';
import { ICreateArticle } from 'src/interfaces/article.interface';
import { ICreateUser, IUpdateUser } from 'src/interfaces/user.interface';
import { useLoginStore } from 'src/stores/login';
const store = useLoginStore();

export class UserRepository {
  constructor() {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + store.token;
  }
  getMe() {
    return api.get('/users/me');
  }
  updateMe(payload: IUpdateUser) {
    return api.patch('/users/me', payload);
  }
  createUser(payload: ICreateUser) {
    return api.post('/users', payload);
  }
  createArticle(payload: ICreateArticle, userId: string) {
    return api.post(`/articles/${userId}`, payload);
  }
  deleteArticle(id: string) {
    return api.delete(`/articles/${id}`);
  }
  getAll(query: { search: string }) {
    return api.get('/users', {
      params: query,
    });
  }
}
