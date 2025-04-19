export interface IUser<T = null> {
    _id?: T;
    name: string;
    email: string;
    password: string;
  }
  