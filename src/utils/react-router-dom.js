"use client";

import NextLink from 'next/link';
import { useRouter as useNextRouter, usePathname, useParams as useNextParams, useSearchParams as useNextSearchParams } from 'next/navigation';

export const Link = ({ to, href, children, ...props }) => {
  const destination = to || href || '#';
  return (
    <NextLink href={destination} {...props}>
      {children}
    </NextLink>
  );
};

export const useNavigate = () => {
  const router = useNextRouter();
  return (path, options) => {
    if (typeof path === 'number') {
      if (path === -1) router.back();
      return;
    }
    if (options?.replace) {
      router.replace(path);
    } else {
      router.push(path);
    }
  };
};

export const useLocation = () => {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  
  return {
    pathname,
    search: searchParams ? `?${searchParams.toString()}` : '',
    hash: '', // Next.js doesn't expose hash synchronously in app router easily, but often not needed
  };
};

export const useParams = () => {
  return useNextParams();
};

export const Outlet = ({ children }) => {
  return <>{children}</>;
};
