export interface User {
   id: number;
   name: string;
   email: string;
}

export interface AuthState {
   token: string | null;
   user: User | null;
   isAuth: boolean;
   signIn: (token: string, user: User) => void;
   signOut: () => void;
}
