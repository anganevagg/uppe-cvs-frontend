import { Notify } from 'quasar';

export const errorHandler = (message: string) => {
  Notify.create({
    color: 'negative',
    message: message,
    type: 'negative',
    position: 'top-right',
    timeout: 5000,
  });
};
