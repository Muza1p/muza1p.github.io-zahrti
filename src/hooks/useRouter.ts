import { useCallback, useEffect, useState } from 'react';

function normalizeRoute(raw: string): string {
  const withoutQuery = raw.split('?')[0] || '/';
  const cleaned = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (cleaned.length > 1 && cleaned.endsWith('/')) {
    return cleaned.slice(0, -1);
  }
  return cleaned || '/';
}

const KNOWN_TOP_ROUTES = new Set([
  'library',
  'report',
  'assessment',
  'intro',
  'quiz',
  'analyzing',
  'results',
  'profile',
  'interests',
  'majors',
  'compare',
  'compatibility',
  'our-world',
  'settings',
  'about',
  'methodology',
  'privacy',
  'terms',
]);

function detectRuntimeBasePath(): string {
  try {
    const modulePath = new URL(import.meta.url).pathname;
    const assetsIdx = modulePath.indexOf('/assets/');
    if (assetsIdx > 0) {
      return modulePath.slice(0, assetsIdx);
    }
  } catch {
    // Ignore URL parsing errors
  }
  const envBase = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  if (envBase && envBase !== '.' && envBase !== './' && envBase !== '/') {
    return envBase;
  }
  return '';
}

function readCurrentRoute(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Prefer hash route (#/quiz, #/library, #/majors/...) for static/GitHub Pages/Netlify/Cloudflare stability
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

  // 2. Fallback: strip index.html and runtime/repository base path from pathname if entered directly
  let pathname = (window.location.pathname || '/').replace(/\/index\.html$/i, '') || '/';
  const runtimeBase = detectRuntimeBasePath();
  if (runtimeBase && pathname.startsWith(runtimeBase)) {
    pathname = pathname.slice(runtimeBase.length) || '/';
  } else {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && !KNOWN_TOP_ROUTES.has(segments[0])) {
      if (window.location.hostname.endsWith('github.io') || segments.length === 1) {
        pathname = '/' + segments.slice(1).join('/');
      }
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('autostart') === '1' && (pathname === '/' || pathname === '')) {
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
