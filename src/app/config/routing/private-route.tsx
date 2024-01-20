import { Navigate, Outlet, } from 'react-router-dom';

import { Layout } from '@/widgets/layout';

import { StorageKeys } from '@/shared/lib/constants';
import { routePaths } from '@/shared/config/routing';

export const PrivateRoute = () => {
  const token = localStorage.getItem(StorageKeys.USER_INFO);


  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : <Navigate to={routePaths.login} />;

};
