import { User } from './common';

export interface LoginResponse {
   token: string;
   user: User;
}

export interface LoginCredentials {
   email: string;
   password: string;
}
