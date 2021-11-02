export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
}

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}