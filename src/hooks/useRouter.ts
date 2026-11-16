import { useCallback, useEffect, useState } from 'react';

function normalizeRoute(raw: string): string {
  const withoutQuery = raw.split('?')[0] || '/';
  const cleaned = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    return cleaned.slice(0, -1);
  }
  return cleaned || '/';
}

function readCurrentRoute(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Prefer hash route (#/quiz, #/compatibility, #/majors/...) for static/GitHub Pages stability
  const hash = window.location.hash;
  if (hash && hash.startsWith('#')) {
    const insideHash = hash.slice(1);
    if (insideHash.startsWith('/')) {
      return normalizeRoute(insideHash);
    }
    if (insideHash.length > 0) {
      return normalizeRoute(`/${insideHash}`);
    }
    return '/';
  }

  // 2. Fallback: strip Vite BASE_URL from pathname if entered directly
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  let pathname = window.location.pathname || '/';
  if (baseUrl && baseUrl !== '/' && pathname.startsWith(baseUrl)) {
    pathname = pathname.slice(baseUrl.length) || '/';
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1' && pathname === '/') {
    return '/quiz';
  }

  return normalizeRoute(pathname);
}

export function toHref(to: string): string {
  const normalized = normalizeRoute(to);
  return `#${normalized}`;
}

export function useRouter() {
  const [pathname, setPathname] = useState<string>(readCurrentRoute);

  useEffect(() => {
    const syncRoute = () => {
      setPathname(readCurrentRoute());
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigate = useCallback(
    (to: string) => {
      if (typeof window === 'undefined') return;
      const targetRoute = normalizeRoute(to);
      if (targetRoute === pathname && window.location.hash === `#${targetRoute}`) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      window.location.hash = `#${targetRoute}`;
      setPathname(targetRoute);
      window.scrollTo({ top: 0, behavior: 'auto' });
    },
    [pathname]
  );

  return { pathname, navigate, toHref };
}
