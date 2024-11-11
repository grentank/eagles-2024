import React from 'react';
import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';
import ChatwsProvider from './providers/chatws/ChatwsProvider';

function App(): JSX.Element {
  return (
    <AppProvider>
      <ChatwsProvider>
        <AppRouterProvider />
      </ChatwsProvider>
    </AppProvider>
  );
}

export default App;
