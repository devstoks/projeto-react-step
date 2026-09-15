import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/projeto-final/contexts/ThemeContext.jsx';
import { CartProvider } from './components/projeto-final/contexts/CartContext.jsx';

createRoot(document.getElementById('root')).render(
<StrictMode>
    <ThemeProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </ThemeProvider>
</StrictMode>
);