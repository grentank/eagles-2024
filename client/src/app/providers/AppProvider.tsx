import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

type AppProviderProps = {
  children: JSX.Element;
};

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
