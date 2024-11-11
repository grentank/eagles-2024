import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { checkAuthThunk } from '../../entities/auth/model/authThunks';
import useAppRoutes from './lib/useAppRoutes';
import { UserStatusEnum } from '../../entities/auth/model/schema';
import { loadAllProductsThunk } from '../../entities/product/model/productThunks';

export default function AppRouterProvider(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.auth.user.status);

  useEffect(() => {
    void dispatch(loadAllProductsThunk());
    void dispatch(checkAuthThunk());
  }, []);

  useEffect(() => {

  }, [status]);

  const routes = useAppRoutes();
  const router = createBrowserRouter(routes);
  if (status === UserStatusEnum.pending) return <h1>Loading...</h1>;
  return <RouterProvider router={router} />;
}
