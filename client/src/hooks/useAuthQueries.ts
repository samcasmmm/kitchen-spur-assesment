import { AuthRepository } from '@/api/auth/auth-repo';
import { useAuth } from '@/stores/use-auth-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useSignIn = () => {
   const queryClient = useQueryClient();
   const signIn = useAuth((state) => state.signIn);
   const router = useRouter();

   return useMutation({
      mutationFn: AuthRepository.login,
      onSuccess: (data) => {
         signIn(data.token, data.user);
         queryClient.invalidateQueries({ queryKey: ['user'] });
         router.push('/dashboard');
      }
   });
};

export const useSignOut = () => {
   const signOut = useAuth((state) => state.signOut);
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: AuthRepository.logout,
      onSettled: () => {
         signOut();
         queryClient.clear();
         router.push('/sign-in');
      }
   });
};