import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './app';
import './index.css';

const root = document.getElementById('app');
if (!root) {
  throw new Error('No root');
}

createRoot(root).render(<Provider store={store}><App /></Provider>);
