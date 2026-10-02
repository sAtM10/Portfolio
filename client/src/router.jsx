import { createBrowserRouter } from 'react-router';

import RootLayout from '@/components/layout/RootLayout';
import RouteError from '@/components/layout/RouteError';
import RouteFallback from '@/components/layout/RouteFallback';
import LandingPage from '@/pages/LandingPage';

// The landing page ships in the main bundle; every other page is its own chunk.
const lazyPage = (load) => async () => ({ Component: (await load()).default });

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: RouteFallback,
    children: [
      { index: true, Component: LandingPage },
      { path: 'portfolio', lazy: lazyPage(() => import('@/pages/PortfolioPage')) },
      { path: 'workspace', lazy: lazyPage(() => import('@/pages/WorkspacePage')) },
      { path: '*', lazy: lazyPage(() => import('@/pages/NotFoundPage')) },
    ],
  },
]);
