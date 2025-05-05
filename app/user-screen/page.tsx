'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserData = {
  id?: number;
  name?: string;
  email?: string;
  created_at?: string;
};

export default function UserScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(user);
        setUserData({
          ...parsedUser,
          created_at: '01/09/2024' 
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.02]">
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-6 animate-bounce">👋</div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Bem-vindo de volta, {userData.name || 'Explorador'}!
          </h1>
          
          <p className="text-gray-600 mb-6 text-center">
            Seu acesso à plataforma está garantido
          </p>

          <div className="w-full space-y-4 mb-8">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h2 className="text-sm font-semibold text-indigo-800 mb-2">
                📧 Email
              </h2>
              <p className="text-gray-700 break-words">
                {userData.email || 'Não informado'}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-sm font-semibold text-green-800 mb-2">
                🗓️ Conta criada em
              </h2>
              <p className="text-gray-700">
                {userData.created_at || 'Data não disponível'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium
                       hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Acessar Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium
                       hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}