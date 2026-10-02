import { RouterProvider } from 'react-router/dom';

import { router } from '@/router';

// App-wide providers (e.g. motion config in Phase 7) wrap the router here.
export default function App() {
  return <RouterProvider router={router} />;
}
