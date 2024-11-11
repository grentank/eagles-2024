import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/lib/store';
import App from './app/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStore } from './shared/api/axiosInstance';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);

injectStore(store);
