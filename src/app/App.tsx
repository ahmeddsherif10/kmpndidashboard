import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CompoundProvider } from './context/CompoundContext';

export default function App() {
  return (
    <CompoundProvider>
      <RouterProvider router={router} />
    </CompoundProvider>
  );
}
