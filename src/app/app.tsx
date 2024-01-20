import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AppError } from '@/app/config/app-error';
import { RoutesViews } from '@/app/config/routing/init';

import 'react-toastify/dist/ReactToastify.css';

import './styles/global.scss';
import { ToastContainer } from 'react-toastify';

const ErrorFallback = () => {
  return <AppError />;
};

export const App: FC = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <RoutesViews />
        </Suspense>
      </ErrorBoundary>
      <ToastContainer limit={1} style={{
        width: 'auto',
      }}/>
    </>
  );
};
