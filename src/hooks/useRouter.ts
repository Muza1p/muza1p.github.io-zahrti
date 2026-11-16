import { useCallback, useEffect, useState } from 'react';

export function useRouter() {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' && window.location.pathname === '/') {
      return '/quiz';
    }
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return;
    if (to === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    const cleanPath = to.split('?')[0].split('#')[0] || '/';
    setPathname(cleanPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return { pathname, navigate };
}
