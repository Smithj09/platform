import { useEffect, useState } from 'react';

interface Route {
  path: string;
  view: string;
}

export const useNavigate = () => {
  return (path: string) => {
    window.location.hash = path;
  };
};

export const useRouter = (): { currentRoute: string; navigate: (path: string) => void } => {
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    const updateRoute = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentRoute(hash);
    };

    updateRoute();
    window.addEventListener('hashchange', updateRoute);

    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  return {
    currentRoute,
    navigate: (path: string) => {
      window.location.hash = path;
    },
  };
};
