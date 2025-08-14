import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';
import { CurrencyProvider } from './hooks/useCurrency';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
const isClerkConfigured = Boolean(publishableKey && publishableKey !== 'pk_test_your-clerk-key');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isClerkConfigured ? (
      <ClerkProvider publishableKey={publishableKey!}>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ClerkProvider>
    ) : (
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    )}
  </StrictMode>
);
