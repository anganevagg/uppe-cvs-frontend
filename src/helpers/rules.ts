export const rules = {
  email: [
    (v: string): boolean | string => !!v || 'Campo requerido',
    (value: string): boolean | string => {
      return (
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
          value
        ) || 'Formato incorrecto de correo'
      );
    },
  ],
  required: [(v: string): boolean | string => !!v || 'Campo requerido'],
};
