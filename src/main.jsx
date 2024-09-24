import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components/index.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from "./context/index.jsx"
import { FilterProvider } from './context/FilterContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>   
      <FilterProvider>
        <ScrollToTop/>
        <ToastContainer position={"top-center"}/>
        <App />
      </FilterProvider>
      </CartProvider>      
    </BrowserRouter>  
  </StrictMode>,
)